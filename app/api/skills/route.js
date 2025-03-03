"use server"
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Récupérer les compétences
export async function GET(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id'); // Récupérer l'ID de l'objectif depuis les paramètres de requête

    if (!id) {
        return NextResponse.json({ error: 'ID de l\'objectif requis' }, { status: 400 });
    }

    try {
        const goalWithSkills = await prisma.goal.findUnique({
            where: { id: parseInt(id) },
            include: {
                skills: true, // Inclure les compétences associées
            },
        });

        if (!goalWithSkills) {
            return NextResponse.json({ error: 'Objectif non trouvé' }, { status: 404 });
        }

        return NextResponse.json(goalWithSkills);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'objectif avec compétences:', error);
        return NextResponse.json({ error: 'Erreur lors de la récupération de l\'objectif' }, { status: 500 });
    }
}

// Ajouter une compétence
export async function POST(request) {
    const { name, description, category, goalId } = await request.json();

    if (!name || !description || !category || !goalId) {
        return NextResponse.json({ error: 'Tous les champs doivent être remplis' }, { status: 400 });
    }

    try {
        const newSkill = await prisma.skill.create({
            data: {
                name,
                description,
                category,
                goalId: parseInt(goalId), // Assurez-vous que goalId est un entier
            },
        });
        return NextResponse.json(newSkill, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la compétence:', error);
        return NextResponse.json({ error: 'Erreur lors de l\'ajout de la compétence' }, { status: 500 });
    }
}


export async function PUT(request) {
    const { id, name, description, category } = await request.json();

    if (!id || !name || !description || !category) {
        return NextResponse.json({ error: 'Tous les champs doivent être remplis' }, { status: 400 });
    }

    try {
        const updatedSkill = await prisma.skill.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                category,
            },
        });
        return NextResponse.json(updatedSkill);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la compétence:', error);
        return NextResponse.json({ error: 'Erreur lors de la mise à jour de la compétence' }, { status: 500 });
    }
}


export async function DELETE(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID de la compétence requis' }, { status: 400 });
    }

    try {
        await prisma.skill.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: 'Compétence supprimée' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la compétence:', error);
        return NextResponse.json({ error: 'Erreur lors de la suppression de la compétence' }, { status: 500 });
    }
}