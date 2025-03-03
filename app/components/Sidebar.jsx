import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
            <h2 className="text-xl font-bold p-4">Menu</h2>
            <ul className="flex-grow space-y-2 p-4">
                <li>
                    <Link href="/dashboard" className="block p-4 hover:bg-gray-700">Dashboard</Link>
                </li>
                <li>
                    <Link href="../goals" className="block p-4 hover:bg-gray-700">Goals</Link>
                </li>

                <li>
                    <Link href="/skills" className="block p-4 hover:bg-gray-700">Skills</Link>
                </li>
                <li>
                    <Link href="/task" className="block p-4 hover:bg-gray-700">Task</Link>
                </li>
            </ul>
            
        </div>
    );
};

export default Sidebar;