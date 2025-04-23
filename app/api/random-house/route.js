import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const allHouses = await prisma.house.findMany({
      where: {
        deletedAt: null,
        active: false,
        status: "ACCEPT",
      },
    });
    const shuffledHouses = allHouses.sort(() => 0.5 - Math.random());
    const results = shuffledHouses.slice(0, 10);

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}
