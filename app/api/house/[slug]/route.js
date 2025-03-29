import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Hàm loại bỏ password khỏi object user
const exclude = (user, keys) => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
};

export async function GET(req, { params }) {
  const { slug } = params;

  // Kiểm tra slug có hợp lệ không
  const houseId = Number(slug);
  if (isNaN(houseId)) {
    return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  try {
    const house = await prisma.house.findUnique({
      where: { id: houseId },
      include: { user: true },
    });

    if (!house) {
      return NextResponse.json(
        { error: "Không tìm thấy tài liệu" },
        { status: 404 }
      );
    }

    // Nếu house có user, loại bỏ password
    if (house.user) {
      house.user = exclude(house.user, ["password"]);
    }

    return NextResponse.json(house);
  } catch (error) {
    console.error("Lỗi truy vấn Prisma:", error);

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const data = await req.json();

  // Kiểm tra slug có hợp lệ không
  const houseId = Number(data.id);
  if (isNaN(houseId)) {
    return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  try {
    const dataUpdate = await prisma.house.update({
      where: { id: houseId },
      data: data.data,
    });
    return NextResponse.json(dataUpdate);
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}
