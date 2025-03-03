"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser (data) {
  const { name, email } = data;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    console.log("Utilisateur enregistré avec succès");
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    throw new Error("Échec de la création de l'utilisateur."); // Lance une erreur personnalisée
  }
}

// Fermez la connexion lorsque l'application se termine
process.on("exit", async () => {
  await prisma.$disconnect();
});