import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const data = await prisma.favourite.findMany({
      select: {
        house: true, // Chỉ lấy dữ liệu của house, không cần lọc lại bằng map()
      },
      take: 10, // Giới hạn số lượng kết quả
    });

    // Chuyển về mảng house
    return NextResponse.json(data.map((item) => item.house));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}
