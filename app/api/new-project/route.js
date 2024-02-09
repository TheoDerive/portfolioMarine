import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Category from "@/models/Category";
import Project from "@/models/Project";

export async function POST(req, res) {
  await connectToDB();

  console.log(req.body);

  const {
    nameCategory,
    nameProject,
    imageProject,
    descriptionProject,
    dateProjet,
    isLarge,
    isTall,
  } = await req.json();
  const allCategory = await Category.findOne({ name: nameCategory });

  if (allCategory) {
    // Vérifier si le projet existe déjà dans la liste content
    const projectExists = allCategory.content.some(
      (project) =>
        (project.name === nameProject && project.image === imageProject) ||
        (project.name === nameProject &&
          project.description === descriptionProject) ||
        (project.name === nameProject && project.date === dateProjet),
    );

    if (projectExists) {
      return NextResponse.json({
        message: "Le projet existe déjà dans la catégorie",
      });
    } else if (isLarge === true && isTall === true) {
      return NextResponse.json({
        message:
          "Le projet ne peux être, et large, et grand. Ne rien mettre si c'est le cas.",
      });
    } else {
      const newProject = new Project({
        name: nameProject,
        image: imageProject,
        description: descriptionProject,
        date: dateProjet ? dateProjet : new Date(),
        category: nameCategory,
        isLarge: isLarge,
        isTall: isTall,
      });

      const arrayContent = allCategory.content;
      arrayContent.push(newProject);

      const updatedProject = await Category.findOneAndUpdate(
        { name: nameCategory },
        { $set: { content: arrayContent } },
        { new: true },
      );

      return NextResponse.json(updatedProject);
    }
  } else {
    return NextResponse.json({
      message: "La categorie que vous ciblé n'existe pas.",
    });
  }
}
