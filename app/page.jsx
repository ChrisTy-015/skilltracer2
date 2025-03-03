"use client";

import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  const handleClickLogin = () => {
    router.push('/login'); 
  };
  
  const handleClickSignUp = () => {
    router.push('/signup'); 
  };
  const handleClickHome = () => {
    router.push('/'); 
  };


  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white text-gray-700">
      {/* Header */}
      <header className="w-full flex justify-between px-8 py-4 items-center">
        <h1 className="text-lg font-semibold">SkillTracker</h1>
        <nav className="space-x-6">
          <button onClick={handleClickHome}>Home</button>
          <button onClick={handleClickLogin}>Login</button>
          <button onClick={handleClickSignUp}>Signup</button>
 
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-4">
        <h1 className="text-6xl font-thin text-center">Bienvenue sur SkillTracker</h1>
        
        {/* <Card className="w-80 shadow-lg p-4">
          <CardTitle>Suivez vos progrès d'apprentissage</CardTitle>
          <CardContent>
            <p className="text-sm text-gray-600">
              Utilisez cette plateforme pour suivre et améliorer vos compétences en développement.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="primary" onClick={handleClickLogin}>Commencer</Button>
          </CardFooter>
        </Card> */}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 flex justify-between items-center px-8 bg-gray-800 text-white">
        <span className="text-sm">Powered by Webflow</span>
        <div className="space-x-4">
          {/* <Button variant="link" className="text-white" onClick={() => window.location.href='https://www.snapchat.com'}>SNAPCHAT</Button>
          <Button variant="link" className="text-white" onClick={() => window.location.href='https://www.twitter.com'}>TWITTER</Button>
          <Button variant="link" className="text-white" onClick={() => window.location.href='https://www.instagram.com'}>INSTAGRAM</Button> */}
        </div>
      </footer>
    </div>
  );
}
