import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Category from "@/models/Category";

export async function POST(req, res) {
  await connectToDB();

  console.log(req.body); // Correction: Utilisez req.body au lieu de req.bod
  const { nameCategory, nameProject, imageProject, descriptionProject } =
    await req.json();

  console.log(nameCategory);

  const category = await Category.findOne({ name: nameCategory.toLowerCase() });

  if (category) {
    // Vérifier si le projet existe dans la liste content
    const projectIndex = category.content.findIndex(
      (project) =>
        project.name === nameProject &&
        project.image === imageProject &&
        project.description === descriptionProject,
    );

    if (projectIndex !== -1) {
      // Supprimer le projet de la liste content
      category.content.splice(projectIndex, 1);

      // Mettre à jour la catégorie dans la base de données
      const updatedCategory = await Category.findOneAndUpdate(
        { name: nameCategory.toLowerCase() },
        { $set: { content: category.content } },
        { new: true },
      );

      return NextResponse.json(updatedCategory);
    } else {
      return NextResponse.json({
        message: "Le projet n'existe pas dans la catégorie !",
      });
    }
  } else {
    return NextResponse.json({ error: "Erreur" });
  }
}
