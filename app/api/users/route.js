import { getDataCommon, skip } from "@/config/api";
import { DEFAULT_PAGING } from "@/contants/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = Number(searchParams.get("userId"));

    const page = searchParams.get("page");
    if (userId) {
      const me = await prisma.user.findFirst({
        where: {
          id: Number(userId),
        },
      });
      if (!me) {
        return NextResponse.json(
          { error: "Không tìm thấy dữ liệu" },
          { status: 404 }
        );
      }
      delete me.password;
      return NextResponse.json(me);
    }

    const users = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      skip: skip(page),
      take: DEFAULT_PAGING.page_size,
    });
    const total = await prisma.user.count({
      where: { role: "USER", active: false },
    });

    return NextResponse.json(getDataCommon(users, { total, skip: skip(page) }));
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const data = await req.json();
    const { userId, ...rest } = data;

    const user = await prisma.user.update({
      where: {
        id: data?.userId,
      },
      data: rest,
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

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
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
