import { connectToDB } from "@/utils/database";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await connectToDB();

  try {
    const allCategories = await Category.find();
    return NextResponse.json(allCategories);
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: "Impossible de récuperer les informations demandées...",
    });
  }
}
