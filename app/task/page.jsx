"use client";

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';


const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('false');
    const [editingTaskId, setEditingTaskId] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/task');
            const data = await response.json();
            setTasks(data);
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            tasks.forEach(task => {
                const taskDueDate = new Date(task.dueDate);

                // Vérifie si la tâche est à faire bientôt (dans la minute suivante)
                if (!task.status && (taskDueDate - now) <= 60 * 1000 && (taskDueDate - now) > 0) {
                    alert(`Tâche à faire bientôt: ${task.title}`);
                } 
                // Vérifie si la tâche est à faire maintenant (sans prendre en compte les secondes)
                else if (!task.status && 
                    taskDueDate.getFullYear() === now.getFullYear() && 
                    taskDueDate.getMonth() === now.getMonth() && 
                    taskDueDate.getDate() === now.getDate() &&
                    taskDueDate.getHours() === now.getHours() && 
                    taskDueDate.getMinutes() === now.getMinutes()) {
                    alert(`La tâche ${task.title} est à faire maintenant`);
                } 
                // Vérifie si la tâche est en retard (en prenant en compte les minutes)
                else if (!task.status && taskDueDate < now) {
                    alert(`Vous avez une tâche en retard: ${task.title}`);
                }
            });
        }, 30000); // Vérifie toutes les 1 minute

        return () => clearInterval(interval); // Nettoyage de l'intervalle
    }, [tasks]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/task', {
            method: editingTaskId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: editingTaskId,
                title,
                status: status === 'true',
                dueDate
            }),
        });

        if (response.ok) {
            const newTask = await response.json();
            if (editingTaskId) {
                setTasks((prevTasks) => prevTasks.map(task => task.id === editingTaskId ? newTask : task));
                setEditingTaskId(null);
            } else {
                setTasks((prevTasks) => [...prevTasks, newTask]);
            }
            setTitle('');
            setDueDate('');
            setStatus('false');
        } else {
            console.error('Erreur lors de l\'ajout ou de la modification de la tâche');
        }
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDueDate(task.dueDate);
        setStatus(task.status.toString());
        setEditingTaskId(task.id);
    };

    const handleDelete = async (id) => {
        const response = await fetch(`/api/task?id=${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
        } else {
            const errorData = await response.json();
            console.error('Erreur lors de la suppression de la tâche:', errorData.error);
        }
    };

    const handleStatusChange = async (task) => {
        const updatedStatus = !task.status; // Inverse le statut
        const response = await fetch(`/api/task`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: task.id,
                title: task.title,
                status: updatedStatus,
                dueDate: task.dueDate,
            }),
        });

        if (response.ok) {
            const updatedTask = await response.json();
            setTasks((prevTasks) => prevTasks.map(t => t.id === task.id ? updatedTask : t));
            alert(`Tâche ${updatedStatus ? 'terminée' : 'en cours'}: ${task.title}`);
        } else {
            console.error('Erreur lors de la mise à jour du statut de la tâche');
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold">Tâches</h1>

                {/* Task Form */}
                <h2 className="text-xl font-semibold mt-4">{editingTaskId ? 'Modifier la tâche' : 'Créer une nouvelle tâche'}</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        placeholder="Titre de la tâche"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                    <input
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border p-2 w-full mt-2"
                        required
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-2 w-full mt-2"
                    >
                        <option value="false">En cours</option>
                        <option value="true">Terminé</option>
                    </select>
                    <button type="submit" className="bg-blue-500 text-white p-2 mt-2">{editingTaskId ? 'Mettre à jour' : 'Ajouter la tâche'}</button>
                </form>

                {/* Task List */}
                <h2 className="text-xl font-semibold mt-6">Liste des tâches</h2>
                <ul className="space-y-4 mt-4">
                    {tasks.map((task) => (
                        <li key={task.id} className={`p-4 border rounded-lg ${task.status ? 'bg-green-100' : 'bg-yellow-100'}`}>
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                            <p className="text-sm text-gray-600">Date d'échéance: {new Date(task.dueDate).toLocaleString()}</p>
                            <span className={`inline-block mt-2 px-2 py-1 text-xs font-bold text-white rounded-full ${task.status ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                {task.status ? 'Terminé' : 'En cours'}
                            </span>
                            <div className="mt-2">
                                <button
                                    onClick={() => handleEdit(task)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Supprimer
                                </button>
                                <button
                                    onClick={() => handleStatusChange(task)}
                                    className={`ml-2 ${task.status ? 'bg-gray-500' : 'bg-green-500'} text-white px-2 py-1 rounded`}
                                >
                                    {task.status ? 'Reprendre' : 'Terminer'}
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
    );
};

export default Tasks;