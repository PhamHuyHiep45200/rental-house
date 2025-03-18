import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const results = await prisma.house.findMany({
      take: 10,
      // orderBy: {
      //   createdAt: "desc",
      // },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}
