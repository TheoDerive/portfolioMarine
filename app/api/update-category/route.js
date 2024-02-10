import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Category from "@/models/Category";

export async function PUT(req, res) {
  await connectToDB();
  const { oldCategoryName, newCategoryName, newCategoryImage } =
    await req.json();

  const category = await Category.findOne({ name: oldCategoryName });

  for (let i = 0; i < category.content.length; i++) {
    const element = category.content[i];
    element.category = newCategoryName;
  }

  const updatedCategory = await Category.findOneAndUpdate(
    { name: oldCategoryName },
    {
      $set: {
        name: newCategoryName,
        image: newCategoryImage,
        content: category.content,
      },
    },
    { new: true },
  );

  if (updatedCategory) {
    console.log(updatedCategory);
    return NextResponse.json(updatedCategory);
  } else {
    res.send("La catégorie à mettre à jour n'existe pas !");
  }
}
