import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const signature = cloudinary.utils.api_sign_request(
    body.paramsToSign,
    // process.env.CLOUDINARY_API_SECRET
    "8NSo6Yrj3jnkKLFkTT6edMwK8HY"
  );
  console.log({ signature });

  return NextResponse.json({ signature });
};
