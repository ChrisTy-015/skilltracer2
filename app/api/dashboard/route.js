"use server"
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const skillsCount = await prisma.skill.count();
        const tasksCount = await prisma.task.count();
        const goalsCount = await prisma.goal.count();

        return NextResponse.json({
            skills: skillsCount,
            tasks: tasksCount,
            goals: goalsCount,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des données.' }, { status: 500 });
    }
}