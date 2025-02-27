import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const [
      userCount,
      houseRent,
      housePair,
      housePending,
      houseAccept,
      houseReject,
      houseTrue,
      houseFalse,
      houseHN,
      houseDN,
      houseHCM,
      categoryCount,
    ] = await Promise.all([
      await prisma.house.count(),
      prisma.house.count({
        where: { type: "RENT" },
      }),
      await prisma.house.count({ where: { type: "PAIR" } }),
      await prisma.house.count({ where: { status: "PENDING" } }),
      await prisma.house.count({ where: { status: "ACCEPT" } }),
      await prisma.house.count({ where: { status: "REJECT" } }),
      await prisma.house.count({ where: { active: true } }),
      await prisma.house.count({ where: { active: false } }),
      await prisma.house.count({ where: { province: 1 } }),
      await prisma.house.count({ where: { province: 48 } }),
      await prisma.house.count({ where: { province: 79 } }),
      await prisma.category.count(),
    ]);

    return NextResponse.json({
      userCount: userCount || 0,
      houseRent: houseRent || 0,
      housePair: housePair || 0,
      housePending: housePending || 0,
      houseAccept: houseAccept || 0,
      houseReject: houseReject || 0,
      houseTrue: houseTrue || 0,
      houseFalse: houseFalse || 0,
      houseHN: houseHN || 0,
      houseDN: houseDN || 0,
      houseHCM: houseHCM || 0,
      categoryCount: categoryCount || 0,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Đã có lỗi từ Hệ Thống!" },
      { status: 500 }
    );
  }
}
