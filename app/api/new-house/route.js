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

    // Handle predefined money range filters (in millions)
    let moneyRangeCondition = {};
    if (filters.money_range) {
      switch (filters.money_range) {
        case "0-2":
          moneyRangeCondition = { gte: 0, lte: 2000000 };
          break;
        case "2-5":
          moneyRangeCondition = { gte: 2000000, lte: 5000000 };
          break;
        case "5-10":
          moneyRangeCondition = { gte: 5000000, lte: 10000000 };
          break;
        case "10-up":
          moneyRangeCondition = { gte: 10000000 };
          break;
        default:
          break;
      }
    }

    // Handle predefined square range filters (in m2)
    let squareRangeCondition = {};
    if (filters.square_range) {
      switch (filters.square_range) {
        case "0-30":
          squareRangeCondition = { gte: 0, lte: 30 };
          break;
        case "30-50":
          squareRangeCondition = { gte: 30, lte: 50 };
          break;
        case "50-up":
          squareRangeCondition = { gte: 50 };
          break;
        default:
          break;
      }
    }

    // Tạo điều kiện tìm kiếm
    const where = {
      active: false,
      deletedAt: null,
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
      ...(money_from !== undefined ||
      money_to !== undefined ||
      filters.money_range
        ? {
            money: {
              ...(money_from !== undefined ? { gte: money_from } : {}),
              ...(money_to !== undefined ? { lte: money_to } : {}),
              ...(filters.money_range ? moneyRangeCondition : {}),
            },
          }
        : {}),
      ...(square_from !== undefined ||
      square_to !== undefined ||
      filters.square_range
        ? {
            square: {
              ...(square_from !== undefined ? { gte: square_from } : {}),
              ...(square_to !== undefined ? { lte: square_to } : {}),
              ...(filters.square_range ? squareRangeCondition : {}),
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
