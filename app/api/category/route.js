import { getDataCommon, skip } from "@/config/api";
import { DEFAULT_PAGING } from "@/contants/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    const active = searchParams.get("active");
    const activeObject = active ? { active } : {};
    const category = await prisma.category.findMany({
      where: {
        ...activeObject,
      },
      skip: skip(page),
      take: DEFAULT_PAGING.page_size,
    });
    const total = await prisma.category.count();

    return NextResponse.json(
      getDataCommon(category, { total, skip: skip(page) })
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const categoryFind = await prisma.category.findFirst({
      where: {
        name: body?.name,
      },
    });
    if (categoryFind) {
      return NextResponse.json(
        { error: "Danh mục đã tồn tại!" },
        { status: 400 }
      );
    }
    const category = await prisma.category.create({
      data: body,
    });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const body = await req.json();
  try {
    const dataDelete = await prisma.category.update({
      where: {
        id: body.id,
      },
      data: {
        active: body.active,
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
