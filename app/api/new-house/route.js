import { PRODUCT_STATUS } from "@/contants/product";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filters = Object.fromEntries(searchParams.entries());

    // Chuyển đổi kiểu dữ liệu phù hợp
    const take = filters.take ? Number(filters.take) : 10;
    const page = filters.page ? Number(filters.page) : 1;
    const skip = (page - 1) * take;

    const money_from = filters.money_from
      ? Number(filters.money_from)
      : undefined;
    const money_to = filters.money_to ? Number(filters.money_to) : undefined;
    const square_from = filters.square_from
      ? Number(filters.square_from)
      : undefined;
    const square_to = filters.square_to ? Number(filters.square_to) : undefined;
    const district = filters.district ? Number(filters.district) : undefined;

    // Tạo điều kiện tìm kiếm
    const where = {
      status: PRODUCT_STATUS.APPROVED,
      ...(filters.category && { categoryId: Number(filters.category) }),
      ...(filters.province && { province: Number(filters.province) }),
      ...(district !== undefined && { district }),
      ...(filters.type && { type: filters.type }),
      ...(filters.key_search && {
        OR: [
          { title: { contains: filters.key_search, mode: "insensitive" } },
          {
            description: { contains: filters.key_search, mode: "insensitive" },
          },
        ],
      }),
      ...(money_from !== undefined || money_to !== undefined
        ? {
            money: {
              ...(money_from !== undefined ? { gte: money_from } : {}),
              ...(money_to !== undefined ? { lte: money_to } : {}),
            },
          }
        : {}),
      ...(square_from !== undefined || square_to !== undefined
        ? {
            square: {
              ...(square_from !== undefined ? { gte: square_from } : {}),
              ...(square_to !== undefined ? { lte: square_to } : {}),
            },
          }
        : {}),
    };

    // Truy vấn Prisma
    const [results, totalRecord] = await Promise.all([
      prisma.house.findMany({
        take,
        skip,
        where,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.house.count({ where }),
    ]);

    return NextResponse.json({
      data: results,
      totalPage: Math.ceil(totalRecord / take),
      totalRecord,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}
