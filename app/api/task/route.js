"use server";

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function POST(request) {
  const { title, dueDate, status } = await request.json();

  try {
    const task = await prisma.task.create({
      data: {
        title,
        dueDate: new Date(dueDate),
        status,
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}


export async function PUT(request) {
  const { id, title, dueDate, status } = await request.json();

  try {
    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        dueDate: new Date(dueDate),
        status,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}


export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id'); // Récupérer l'ID à partir des paramètres de l'URL

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const taskId = parseInt(id);
        if (isNaN(taskId)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        await prisma.task.delete({
            where: { id: taskId },
        });

        return NextResponse.json({ message: 'Tâche supprimée avec succès' });
    } catch (error) {
        // Gérer les erreurs spécifiques de Prisma
        if (error.code === 'P2025') { // Code d'erreur pour "not found"
            return NextResponse.json({ error: 'Tâche non trouvée' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Une erreur est survenue lors de la suppression de la tâche.' }, { status: 500 });
    }
}