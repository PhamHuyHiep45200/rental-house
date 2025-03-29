import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = new URL(req.url).searchParams; // ✅ Lấy query params đúng cách
    const userId = searchParams.get("userId");
    const houseId = searchParams.get("houseId");

    if (!userId || !houseId) {
      return NextResponse.json(
        { error: "Thiếu userId hoặc houseId" },
        { status: 400 }
      );
    }

    const favourite = await prisma.favourite.findFirst({
      where: {
        userId: Number(userId),
        houseId: Number(houseId),
      },
    });

    if (!favourite) {
      return NextResponse.json({
        message: "Không tìm thấy dữ liệu",
        data: false,
      });
    }

    return NextResponse.json({ data: favourite });
  } catch (error) {
    console.error("Lỗi API:", error);
    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!", details: error.message },
      { status: 500 }
    );
  }
}
