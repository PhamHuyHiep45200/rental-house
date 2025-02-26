import { skip } from "@/config/api";
import { DEFAULT_PAGING } from "@/contants/api";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    const userId = searchParams.get("userId");
    const favourite = await prisma.favourite.findMany({
      where: {
        userId,
        active: true,
      },
      skip: skip(page),
      take: DEFAULT_PAGING.page_size,
    });
    const total = await prisma.favourite.count();

    return NextResponse.json(
      getDataCommon(favourite, { total, skip: skip(page) })
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
    const favouriteFind = await prisma.favourite.findFirst({
      where: {
        userId: body?.userId,
        houseId: body?.houseId,
      },
    });
    if (favouriteFind) {
      return NextResponse.json(
        { error: "Bài viết đã được yêu thích!" },
        { status: 400 }
      );
    }
    const favorite = await prisma.favourite.create({
      data: body,
    });
    return NextResponse.json(favorite);
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
    const dataDelete = await prisma.favourite.delete({
      where: {
        id: body.favouriteId,
        userId: body.userId,
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
