// src/app/signup/page.jsx
import UserForm from './userForm';
import Link from 'next/link';

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Inscription Utilisateur</h1>
      <p className="mb-4">
        Déjà inscrit? <Link href="/login" className="text-blue-500 hover:underline">Connectez-vous!</Link>
      </p>
      <UserForm />
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