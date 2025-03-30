import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { slug } = await params;

  const userId = Number(slug);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  try {
    const data = await req.json();

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
    delete user.password;
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { slug } = await params;

    const userId = Number(slug);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const dataDelete = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        active: true,
      },
    });
    return NextResponse.json(dataDelete);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}
