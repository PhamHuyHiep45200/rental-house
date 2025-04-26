import { getDataCommon, skip } from "@/config/api";
import { DEFAULT_PAGING } from "@/contants/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1; // Nếu không có page thì mặc định là 1
    const userId = Number(searchParams.get("userId"));

    if (!userId) {
      return NextResponse.json({ error: "Thiếu userId" }, { status: 400 });
    }

    const skip = (page - 1) * DEFAULT_PAGING.page_size;

    const favourite = await prisma.favourite.findMany({
      where: {
        userId: userId,
      },
      house: {
          deletedAt: null, // Chỉ lấy house chưa bị xóa
        },
      include: {
        house: true,
      },
      skip: skip,
      take: DEFAULT_PAGING.page_size,
    });

    const total = await prisma.favourite.count({
      where: {
        userId: userId,
      },
      house: {
          deletedAt: null, // Chỉ lấy house chưa bị xóa
        },
    });

    return NextResponse.json({
      data: favourite.map((item) => item.house),
      pagination: {
        total,
        page,
        pageSize: DEFAULT_PAGING.page_size,
      },
    });
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
    const favouriteFind = await prisma.favourite.findFirst({
      where: {
        userId: body?.userId,
        houseId: body?.houseId,
      },
    });
    if (favouriteFind) {
      return NextResponse.json({ error: "Bài viết đã được yêu thích!" });
    }
    const favorite = await prisma.favourite.create({
      data: body,
    });
    return NextResponse.json(favorite);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Đã có lỗi từ Hệ Thống!: ",
        detail: error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const body = await req.json();
  try {
    const dataDelete = await prisma.favourite.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json(dataDelete);
  } catch (error) {
    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!", detail: error },
      { status: 500 }
    );
  }
}
