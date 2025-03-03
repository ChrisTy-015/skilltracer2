import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ 
        success: false,
        error: 'Un utilisateur avec cet email existe déjà' 
      }, { status: 400 });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
      }
    });

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    return NextResponse.json({ 
      success: false,
      error: "Échec de la création de l'utilisateur" 
    }, { status: 500 });
  }
}
