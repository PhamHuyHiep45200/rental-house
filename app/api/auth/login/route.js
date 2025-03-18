import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const userFind = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!userFind) {
      return NextResponse.json(
        { error: "Người dùng không tồn tại!" },
        { status: 400 }
      );
    }
    if (userFind?.email !== email || userFind?.password !== password) {
      return NextResponse.json(
        { error: "Tài khoản hoặc Mật khẩu không đúng!" },
        { status: 400 }
      );
    }
    delete userFind.password;
    return NextResponse.json(userFind);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}
