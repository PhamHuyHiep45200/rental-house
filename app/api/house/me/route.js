import { PRODUCT_STATUS } from "@/contants/product";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const status = searchParams.get("status") || PRODUCT_STATUS.APPROVED;

  if (!userId) {
    return NextResponse.json({ error: "Thiếu userId" }, { status: 400 });
  }

  try {
    const totalRecord = await prisma.house.count({
      where: {
        userId: Number(userId),
        deletedAt: null,
      },
    });

    const totalPage = Math.ceil(totalRecord / limit);

    const data = await prisma.house.findMany({
      where: {
        userId: Number(userId),
        deletedAt: null,
        status,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      data,
      page,
      limit,
      totalPage,
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
