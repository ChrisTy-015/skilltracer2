import Sidebar from '../components/Sidebar';
import Link from 'next/link';

export default function TaskManager() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 relative">
                <h1 className="text-2xl font-bold">Task Manager</h1>

                <div className="absolute bottom-6 right-6">
                    <Link href="/">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Déconnexion
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}