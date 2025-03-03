// src/app/login/page.jsx
import LoginForm from './LoginForm';
import Link from 'next/link';

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Bienvenue</h1>
            <LoginForm />
            <p className="mt-4">
                Pas encore de compte?<Link href="/signup" className="text-blue-500 hover:underline">Inscrivez-vous ici</Link>
            </p>
            <div className="absolute top-6 right-6">
                <Link href="/">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                        SkillTracker
                    </button>
                </Link>
            </div>
        </div>
    );
}