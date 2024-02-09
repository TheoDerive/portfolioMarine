import { connectToDB } from "@/utils/database";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  await connectToDB();

  try {
    const allCategories = await Category.find({
      name: context.params.category,
    });
    return NextResponse.json(allCategories);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Impossible de récupérer les informations demandées...",
    });
  }
}
