"use client"; // Ajoutez cette ligne

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';

export default function Skills() {
    const [goals, setGoals] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [currentGoalId, setCurrentGoalId] = useState('');
    const [editingSkillId, setEditingSkillId] = useState(null); // ID de la compétence en cours d'édition

    // Fonction pour récupérer les objectifs
    const fetchGoals = async () => {
        const response = await fetch('/api/goals');
        const data = await response.json();
        setGoals(data);
    };

    // Récupérer les objectifs au montage du composant
    useEffect(() => {
        fetchGoals();
    }, []);

    const addSkill = async () => {
        if (!newSkill || !newDescription || !newCategory || !currentGoalId) {
            alert('Tous les champs doivent être remplis');
            return;
        }

        const skillData = {
            name: newSkill,
            description: newDescription,
            category: newCategory,
            goalId: currentGoalId,
        };

        const response = await fetch('/api/skills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(skillData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Erreur lors de l\'enregistrement de la compétence:', errorMessage);
            return;
        }

        // Recharger les objectifs après l'ajout
        await fetchGoals();
        resetForm();
        alert('Compétence ajoutée avec succès');
    };

    const editSkill = async (skill) => {
        setEditingSkillId(skill.id);
        setNewSkill(skill.name);
        setNewDescription(skill.description);
        setNewCategory(skill.category);
        setCurrentGoalId(skill.goalId);
    };

    const updateSkill = async () => {
        if (!editingSkillId || !newSkill || !newDescription || !newCategory) {
            alert('Tous les champs doivent être remplis');
            return;
        }

        const skillData = {
            id: editingSkillId,
            name: newSkill,
            description: newDescription,
            category: newCategory,
        };

        const response = await fetch('/api/skills', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(skillData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Erreur lors de la mise à jour de la compétence:', errorMessage);
            return;
        }

        // Recharger les objectifs après la mise à jour
        await fetchGoals();
        resetForm();
        alert('Compétence mise à jour avec succès');
    };

    const deleteSkill = async (skillId) => {
        const response = await fetch(`/api/skills?id=${skillId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Erreur lors de la suppression de la compétence:', errorMessage);
            return;
        }

        // Recharger les objectifs après la suppression
        await fetchGoals();
        alert('Compétence supprimée avec succès');
    };

    const resetForm = () => {
        setNewSkill('');
        setNewDescription('');
        setNewCategory('');
        setCurrentGoalId('');
        setEditingSkillId(null);
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 relative">
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4">Ajouter ou Modifier une Compétence                     </h1>

                    <div className="mb-4">
                        <select
                            value={currentGoalId}
                            onChange={(e) => setCurrentGoalId(e.target.value)}
                            className="border p-2 rounded mr-2"
                        >
                            <option value="">Sélectionnez un objectif</option>
                            {goals.map(goal => (
                                <option key={goal.id} value={goal.id}>{goal.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Nom de la compétence"
                            className="border p-2 rounded mr-2"
                        />
                        <input
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Description"
                            className="border p-2 rounded mr-2"
                        />
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Catégorie"
                            className="border p-2 rounded mr-2"
                        />
                        {editingSkillId ? (
                            <button
                                onClick={updateSkill}
                                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                            >
                                Mettre à jour la compétence
                            </button>
                        ) : (
                            <button
                                onClick={addSkill}
                                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                Ajouter Compétence
                            </button>
                        )}
                    </div>

                    {/* Affichage des objectifs et de leurs compétences */}
                    <div className="mt-6 w-full">
                        <h2 className="text-xl font-bold mb-2">Objectifs et Compétences Associées</h2>
                        {goals.map(goal => (
                            <div key={goal.id} className="border p-4 mb-4 rounded">
                                <h3 className="text-lg font-semibold">{goal.name} - {goal.status}</h3>
                                <p>{goal.description}</p>
                                <h4 className="font-medium">Compétences Associées :</h4>
                                {goal.skills.length > 0 ? (
                                    <ul className="list-disc pl-5">
                                        {goal.skills.map(skill => (
                                            <li key={skill.id} className="flex justify-between items-center">
                                                <span>
                                                    <strong>{skill.name}</strong>: {skill.description} (Catégorie: {skill.category})
                                                </span>
                                                <div>
                                                    <button
                                                        onClick={() => editSkill(skill)}
                                                        className="text-yellow-500 hover:text-yellow-600 mr-2"
                                                    >
                                                        Modifier
                                                    </button>
                                                    <button
                                                        onClick={() => deleteSkill(skill.id)}
                                                        className="text-red-500 hover:text-red-600"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Aucune compétence associée.</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-6 right-6">
                        <Link href="/">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Déconnexion
                            </button>
                        </Link>
                    </div>
                </div> 
            </div>
        </div>
    );
}