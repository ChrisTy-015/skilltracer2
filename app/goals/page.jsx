"use client";

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';

export default function Goals() {
    const [goals, setGoals] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('en cours');
    const [editingGoalId, setEditingGoalId] = useState(null);

    useEffect(() => {
        const fetchGoals = async () => {
            const response = await fetch('/api/goals');
            const data = await response.json();
            setGoals(data);
        };
        fetchGoals();
    }, []);

    const addGoal = async () => {
        const newGoal = { name, description, status };
        const response = await fetch('/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGoal),
        });
        const savedGoal = await response.json();
        setGoals([...goals, savedGoal]);
        resetForm();
    };

    const deleteGoal = async (id) => {
        await fetch(`/api/goals?id=${id}`, {
            method: 'DELETE',
        });
        setGoals(goals.filter(goal => goal.id !== id));
    };

    const updateGoal = async (id) => {
        const updatedGoal = { id, name, description, status };
        const response = await fetch(`/api/goals`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedGoal),
        });

        if (response.ok) {
            const savedGoal = await response.json();
            setGoals(goals.map(goal => (goal.id === id ? savedGoal : goal)));
            resetForm();
        } else {
            const error = await response.json();
            console.error('Échec de la mise à jour de l\'objectif :', error);
        }
    };

    const handleEdit = (goal) => {
        setName(goal.name);
        setDescription(goal.description);
        setStatus(goal.status === 'terminé' ? 'terminé' : 'en cours');
        setEditingGoalId(goal.id);
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setStatus('en cours');
        setEditingGoalId(null);
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 relative">
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4">Avez-vous des objectifs ?!</h1>
                    <h1 className="text-xl mb-6">Commencez ! step by step</h1>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nom de l'objectif"
                            className="border p-2 rounded mr-2"
                        />
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="border p-2 rounded mr-2"
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border p-2 rounded mr-2"
                        >
                            <option value="en cours">En cours</option>
                            <option value="terminé">Terminé</option>
                        </select>
                        <button
                            onClick={editingGoalId ? () => updateGoal(editingGoalId) : addGoal}
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        >
                            {editingGoalId ? 'Confirmer' : 'Ajouter'}
                        </button>
                    </div>

                    <ul className="w-full">
                        {goals.map(goal => (
                            <li key={goal.id} className="flex items-center justify-between bg-white p-4 mb-2 rounded shadow">
                                <div>
                                    <h2 className="font-bold">{goal.name}</h2>
                                    <p>{goal.description}</p>
                                    <p>Status : {goal.status}</p>
                                </div>
                                <div className="flex space-x-2">
                                <button onClick={() => handleEdit(goal)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded">
                                        Modifier
                                    </button>
                                    <button onClick={() => deleteGoal(goal.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

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