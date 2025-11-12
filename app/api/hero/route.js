import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Hero from "@/app/models/Hero";
import { uploadToCloudinary, deleteFromCloudinary } from "../../lib/cloudinary";

export async function POST(req) {
  try {
    await connectMongoDB();
    const formData = await req.formData();
    
    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    const buttonText = formData.get('buttonText');
    const buttonLink = formData.get('buttonLink');
    const image = formData.get('image');

    // التحقق من البيانات
    if (!title || !subtitle || !buttonText || !buttonLink || !image) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة" },
        { status: 400 }
      );
    }

    // رفع الصورة إلى Cloudinary
    const uploadResult = await uploadToCloudinary(image);
    
    if (!uploadResult.success) {
      return NextResponse.json(
        { error: "فشل في رفع الصورة" },
        { status: 500 }
      );
    }

    // حفظ البيانات في قاعدة البيانات
    const newHero = await Hero.create({
      title,
      subtitle,
      buttonText,
      buttonLink,
      image: uploadResult.url,
      imagePublicId: uploadResult.public_id
    });

    return NextResponse.json(
      { 
        message: "تم إضافة الشريحة بنجاح", 
        hero: newHero 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hero slide:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إضافة الشريحة" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const heroes = await Hero.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({ heroes });
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return NextResponse.json(
      { error: "فشل في جلب شرائح الهيرو" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectMongoDB();
    const { id, title, subtitle, buttonText, buttonLink } = await req.json();

    if (!title || !subtitle || !buttonText || !buttonLink) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة" },
        { status: 400 }
      );
    }

    const updatedHero = await Hero.findByIdAndUpdate(
      id,
      { title, subtitle, buttonText, buttonLink },
      { new: true }
    );

    if (!updatedHero) {
      return NextResponse.json(
        { error: "الشريحة غير موجودة" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "تم تعديل الشريحة بنجاح", 
        hero: updatedHero 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating hero slide:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تعديل الشريحة" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectMongoDB();
    const { id } = await req.json();

    // إيجاد الشريحة
    const hero = await Hero.findById(id);
    if (!hero) {
      return NextResponse.json(
        { error: "الشريحة غير موجودة" },
        { status: 404 }
      );
    }

    // حذف الصورة من Cloudinary
    const deleteResult = await deleteFromCloudinary(hero.imagePublicId);
    
    if (!deleteResult.success) {
      console.error("Failed to delete image from Cloudinary:", deleteResult.error);
    }

    // حذف الشريحة من قاعدة البيانات
    await Hero.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "تم حذف الشريحة بنجاح" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف الشريحة" },
      { status: 500 }
    );
  }
}