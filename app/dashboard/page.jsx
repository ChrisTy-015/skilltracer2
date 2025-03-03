"use client";

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';

const Dashboard = () => {
    const [data, setData] = useState({ skills: 0, tasks: 0, goals: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/dashboard');
            const result = await response.json();
            setData(result);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return <p className="text-center text-lg">Chargement...</p>;

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-grow p-6">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold">Nombre de Compétences</h2>
                        <p className="text-3xl font-bold text-blue-600">{data.skills}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold">Nombre de Tâches</h2>
                        <p className="text-3xl font-bold text-green-600">{data.tasks}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold">Nombre d'Objectifs</h2>
                        <p className="text-3xl font-bold text-purple-600">{data.goals}</p>
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
};

export default Dashboard;