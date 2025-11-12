import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // نحول الصورة إلى base64
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);
    const base64String = `data:${file.type};base64,${bytes.toString("base64")}`;

    // نرفعها إلى Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64String, {
      folder: "products",
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
