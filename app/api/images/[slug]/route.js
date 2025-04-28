// pages/api/images/[filename].ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";

export async function GET(req, { params }) {
  try {
    const { slug: filename } = params;
    const filePath = path.join(process.cwd(), "public/uploads", filename);

    // Đọc file
    const fileBuffer = await readFile(filePath);

    // Xác định content type dựa trên extension
    const extension = path.extname(filename).toLowerCase();
    const contentType =
      extension === ".jpg" || extension === ".jpeg"
        ? "image/jpeg"
        : extension === ".png"
        ? "image/png"
        : "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return undefined;
  }
}
