import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  const data = await req.json();
  const { id, password, newPassword } = data;
  try {
    const userSearch = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!userSearch) {
      return NextResponse.json(
        { error: "Người dùng không tồn tại!" },
        { status: 400 }
      );
    }
    if (userSearch.password !== password) {
      return NextResponse.json(
        { error: "Mật khẩu không chính xác!" },
        { status: 400 }
      );
    }
    const dataUpdate = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
      },
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
