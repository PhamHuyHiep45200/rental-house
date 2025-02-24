import { getDataCommon, skip } from "@/config/api";
import { DEFAULT_PAGING } from "@/contants/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const houseId = searchParams.get("houseId");
    if (houseId) {
      const houseDetail = await prisma.house.findFirst({
        where: {
          id: houseId,
        },
      });
      return NextResponse.json(houseDetail);
    }
    const page = searchParams.get("page");
    const search = searchParams.get("search") || "";
    const province = searchParams.get("province") || "";
    const district = searchParams.get("district") || "";
    const square_to = searchParams.get("square_to") || "";
    const square_from = searchParams.get("square_from") || "";
    const money_from = searchParams.get("money_from") || "";
    const money_to = searchParams.get("money_to") || "";
    const category = searchParams.get("category") || "";
    const sortCondition = {
      where: {
        status: "ACTIVE",
        active: true,
        province,
        district,
        category,
        money: {
          gte: square_from ? parseFloat(money_from) : undefined,
          lte: square_to ? parseFloat(money_to) : undefined,
        },
        square: {
          gte: square_from ? parseFloat(square_from) : undefined,
          lte: square_to ? parseFloat(square_to) : undefined,
        },
        OR: [
          {
            address: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: skip(page),
      take: DEFAULT_PAGING.page_size,
    };
    const searchHouse = await prisma.house.findMany(sortCondition);
    const total = await prisma.house.count(sortCondition);

    return NextResponse.json(
      getDataCommon(searchHouse, { total, skip: skip(page) })
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
    const data = await req.json();
    const houseCreate = await prisma.house.create({
      data,
    });
    return NextResponse.json(houseCreate);
  } catch (error) {
    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  const searchParams = req.nextUrl.searchParams;
  const houseId = searchParams.get("houseId");
  const data = await req.json();
  try {
    const dataUpdate = await prisma.house.update({
      where: {
        id: houseId,
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
