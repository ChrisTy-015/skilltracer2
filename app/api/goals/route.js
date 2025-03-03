import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const goals = await prisma.goal.findMany({
            include: {
                skills: true, // Inclure les compétences associées
            },
        });
        const transformedGoals = goals.map(goal => ({
            ...goal,
            status: goal.status ? 'terminé' : 'en cours',
        }));
        return NextResponse.json(transformedGoals);
    } catch (error) {
        return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des objectifs.' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name, description, status } = await request.json();
        const newGoal = await prisma.goal.create({
            data: {
                name,
                description,
                status: status === 'terminé',
            },
        });
        return NextResponse.json({
            ...newGoal,
            status: newGoal.status ? 'terminé' : 'en cours',
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Une erreur est survenue lors de la création de l\'objectif.' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const { id, name, description, status } = await request.json();
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const updatedGoal = await prisma.goal.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                status: status === 'terminé',
            },
        });
        return NextResponse.json({
            ...updatedGoal,
            status: updatedGoal.status ? 'terminé' : 'en cours',
        });
    } catch (error) {
        return NextResponse.json({ error: 'Une erreur est survenue lors de la mise à jour de l\'objectif.' }, { status: 500 });
    }
}

