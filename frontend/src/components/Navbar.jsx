import { LogOut, Brain } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className='border-b border-gray-200 dark:border-gray-800'>
      <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Brain className='w-6 h-6 text-indigo-600' />
          <span className='font-semibold text-lg'>InsightForge</span>
        </div>

        <div className='flex items-center gap-4'>
          <ThemeToggle />
          <span className='text-sm text-gray-600 dark:text-gray-400'>
            {user?.name}
          </span>
          <button
            onClick={logout}
            className='flex items-center gap-1 text-sm text-red-500 hover:text-red-600'>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
