import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
  try {
    // Lấy formData từ request
    const formData = await req.formData();

    // Lấy tất cả các file từ field "files"
    const files = formData.getAll("files");

    // Kiểm tra xem có file nào được gửi lên không
    if (!files || files.length === 0 || files.every((file) => !file)) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    // Đường dẫn thư mục upload
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Kiểm tra và tạo thư mục nếu chưa tồn tại
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Xử lý từng file
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        if (!file || !file.name) return null; // Bỏ qua file không hợp lệ

        // Chuyển file thành buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Tạo tên file duy nhất
        const extension = path.extname(file.name);
        const filename = `${uuidv4()}${extension}`; // Dùng UUID thay vì timestamp

        // Ghi file vào thư mục
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        return filename; // Trả về tên file để response
      })
    );

    // Lọc bỏ các file null (nếu có)
    const successfulUploads = uploadedFiles.filter((file) => file !== null);

    return NextResponse.json({
      message: "Files uploaded successfully",
      files: successfulUploads,
      status: 201,
    });
  } catch (error) {
    console.error("Error occurred during file upload:", error);
    return NextResponse.json(
      { message: "Failed to upload files", error: error.message },
      { status: 500 }
    );
  }
};

// Cấu hình để Next.js không parse body tự động
export const config = {
  api: {
    bodyParser: false,
  },
};
