import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const count = await prisma.house.count();
    const randomArray = Array.from({ length: count }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    const promises = randomArray.map((index) =>
      prisma.house.findMany({
        skip: index,
        take: 1,
      })
    );

    const results = await Promise.all(promises);

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}
