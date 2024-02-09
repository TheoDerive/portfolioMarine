import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Category from "@/models/Category";

export async function PUT(req, res) {
  await connectToDB();
  const { oldCategoryName, newCategoryName, newCategoryImage } =
    await req.json();

  const updatedCategory = await Category.findOneAndUpdate(
    { name: oldCategoryName },
    { $set: { name: newCategoryName, image: newCategoryImage } },
    { new: true },
  );

  if (updatedCategory) {
    return NextResponse.json(updatedCategory);
  } else {
    res.send("La catégorie à mettre à jour n'existe pas !");
  }
}
