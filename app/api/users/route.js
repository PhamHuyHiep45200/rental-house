import { getDataCommon, skip } from "@/config/api";
import { DEFAULT_PAGING } from "@/contants/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const page = searchParams.get("page");
    if (userId) {
      const me = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      return NextResponse.json(me);
    }

    const users = await prisma.user.findMany({
      where: {
        role: "USER",
        active: false,
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
    const meUpdate = prisma.user.update({
      where: {
        id: data?.userId,
      },
      data,
    });
    return NextResponse.json(meUpdate);
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
