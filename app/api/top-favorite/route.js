import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const favourite = await prisma.favourite.findMany({
      include: {
        User: true,
      },
      orderBy: {
        User: {
          _count: "desc",
        },
      },
      skip: 0,
      take: 10,
    });

    return NextResponse.json(favourite);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}
