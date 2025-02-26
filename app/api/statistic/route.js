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
      prisma.house.count(),
      prisma.house.count({
        where: { type: "RENT" },
      }),
      prisma.house.count({ where: { type: "PAIR" } }),
      prisma.house.count({ where: { status: "PENDING" } }),
      prisma.house.count({ where: { status: "ACCEPT" } }),
      prisma.house.count({ where: { status: "REJECT" } }),
      prisma.house.count({ where: { active: true } }),
      prisma.house.count({ where: { active: false } }),
      prisma.house.count({ where: { province: 1 } }),
      prisma.house.count({ where: { province: 48 } }),
      prisma.house.count({ where: { province: 79 } }),
      prisma.category.count(),
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
