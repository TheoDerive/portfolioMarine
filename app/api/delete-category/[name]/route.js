import { connectToDB } from "@/utils/database";
import Category from "@/models/Category";
import { NextResponse } from "next";

export async function GET(req, context) {
  await connectToDB();

  console.log(context.params.name);
  try {
    const removeCategory = await Category.findOneAndDelete({
      name: context.params.name,
    });

    if (removeCategory) {
      console.log("check");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur" });
  }
}
