import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Category from "@/models/Category";

export async function POST(req, res) {
  await connectToDB();
  console.log(req.body);
  const { nameCategory, imageCategory } = await req.json();
  const allCategory = await Category.findOne({ name: nameCategory });

  if (allCategory) {
    return NextResponse.json({ message: "La categorie existe déjà !" });
  } else {
    const newCategory = new Category({
      name: nameCategory.toLowerCase(),
      image: imageCategory,
      content: [],
    });

    try {
      await newCategory.save();
      return NextResponse.json({ message: "Category crée !" });
    } catch (e) {
      e;
      res.send(e);
    }
  }
}
