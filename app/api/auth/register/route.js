import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);
    const exists = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    console.log(exists);
    if (exists) {
      return NextResponse.json(
        { error: "Người dùng đã tồn tại!" },
        { status: 400 }
      );
    } else {
      const user = await prisma.user.create({
        data,
      });
      return NextResponse.json(user);
    }
  } catch (error) {
    console.log(error);

    return NextResponse.error({
      status: 500,
      message: "Đã có lỗi từ Hệ Thống!",
    });
  }
}
