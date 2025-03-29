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
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const province = searchParams.get("province");
    const district = searchParams.get("district");
    const square_to = searchParams.get("square_to");
    const square_from = searchParams.get("square_from");
    const money_from = searchParams.get("money_from");
    const money_to = searchParams.get("money_to");
    const category = searchParams.get("category");
    const active = searchParams.get("active");
    const province_condition = province ? { province } : {};
    const district_condition = district ? { district } : {};
    const category_condition = category ? { category } : {};
    const money_condition = category
      ? {
          money: {
            gte: square_from ? parseFloat(money_from) : undefined,
            lte: square_to ? parseFloat(money_to) : undefined,
          },
        }
      : {};
    const square_condition = category
      ? {
          square: {
            gte: square_from ? parseFloat(square_from) : undefined,
            lte: square_to ? parseFloat(square_to) : undefined,
          },
        }
      : {};

    const sortCondition = {
      where: {
        status: status || "ACTIVE",
        active: active || false,
        ...province_condition,
        ...district_condition,
        ...category_condition,
        ...money_condition,
        ...square_condition,
        OR: [
          {
            address: {
              contains: search || "",
              mode: "insensitive",
            },
          },
          {
            title: {
              contains: search || "",
              mode: "insensitive",
            },
          },
        ],
      },

      skip: skip(page),
      take: DEFAULT_PAGING.page_size,
    };
    const searchHouse = await prisma.house.findMany({
      ...sortCondition,
      include: {
        category: true,
      },
    });
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
    console.log({ data });

    // Kiểm tra các field bắt buộc
    const requiredFields = [
      "title",
      "description",
      "address",
      "district",
      "province",
      "square",
      "money",
      "contact",
      "type",
      "userId",
      "categoryId",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Thiếu các field bắt buộc: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Kiểm tra userId và categoryId có tồn tại không
    const user = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) {
      return NextResponse.json(
        { error: `User với id ${data.userId} không tồn tại` },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      return NextResponse.json(
        { error: `Category với id ${data.categoryId} không tồn tại` },
        { status: 400 }
      );
    }

    // Ánh xạ dữ liệu để đảm bảo chỉ gửi các field hợp lệ
    const houseCreate = await prisma.house.create({
      data: {
        ...data,
        like: 0,
      },
    });

    return NextResponse.json(houseCreate);
  } catch (error) {
    console.error("Error:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!", details: error.message },
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

export async function PUT(req) {
  const data = await req.json();
  const listId = data?.listId;
  try {
    const dataUpdate = await prisma.house.updateMany({
      where: {
        id: {
          in: listId,
        },
      },
      data: {
        status: data.status,
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
