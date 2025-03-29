import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { slug } = await params;
  const data = await req.json();
  try {
    const dataUpdate = await prisma.favorite.update({
      where: {
        id: slug,
      },
      data,
    });
    return NextResponse.json(dataUpdate);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}
