import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Category from "@/models/Category";

export async function PUT(req, res) {
  await connectToDB();
  const {
    nameCategory,
    oldProjectName,
    oldProjectImage,
    oldProjectDescription,
    oldProjectDate,
    oldProjetIsTall,
    oldProjetIsLarge,
    newProjectName,
    newProjectImage,
    newProjectDescription,
    newProjectDate,
    newProjetIsTall,
    newProjetIsLarge,
  } = await req.json();

  const category = await Category.findOne({ name: nameCategory });

  if (category) {
    // Vérifier si le projet existant doit être mis à jour
    const projectIndex = category.content.findIndex(
      (project) =>
        project.name === oldProjectName &&
        project.image === oldProjectImage &&
        project.description === oldProjectDescription,
    );

    category.content[projectIndex];

    if (projectIndex !== -1) {
      // Mettre à jour les détails du projet
      category.content[projectIndex].name = newProjectName;
      category.content[projectIndex].image = newProjectImage;
      category.content[projectIndex].description = newProjectDescription;
      category.content[projectIndex].date = newProjectDate;
      category.content[projectIndex].isLarge = newProjetIsLarge;
      category.content[projectIndex].isTall = newProjetIsTall;

      // Mettre à jour la catégorie dans la base de données
      const updatedCategory = await Category.findOneAndUpdate(
        { name: nameCategory },
        { $set: { content: category.content } },
        { new: true },
      );

      updatedCategory;

      return NextResponse.json(updatedCategory);
    } else {
      return NextResponse.json({
        message: "Le projet à mettre à jour n'existe pas dans la catégorie !",
      });
    }
  } else {
    return NextResponse.json({ message: "La catégorie ne correspond pas !" });
  }
}
