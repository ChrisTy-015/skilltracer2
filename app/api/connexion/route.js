import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Singleton for Prisma client
let prismaClient = null;

function getPrismaClient() {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }
  return prismaClient;
}

// GET handler
export async function GET() {
  return NextResponse.json({ message: 'This endpoint only accepts POST requests' }, { status: 405 });
}

// POST handler
export async function POST(req) {
  try {
    const body = await req.json();
    
    if (!body.name || !body.email) {
      return NextResponse.json({ 
        success: false,
        error: 'Name and email are required' 
      }, { status: 400 });
    }

    const { name, email } = body;

    // Find user by email first
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    // Then verify the name matches
    if (!user || user.name !== name) {
      return NextResponse.json({ 
        success: false,
        error: 'Nom ou email incorrect' 
      }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur:", error);
    return NextResponse.json({ 
      success: false,
      error: "Échec de la vérification de l'utilisateur" 
    }, { status: 500 });
  }
}

// Fermez la connexion lorsque l'application se termine
process.on("exit", async () => {
  await prisma.$disconnect();
});