import { LogOut } from 'lucide-react'
import ThemeToggle from './ThemeToggle';


const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "./login";
  }

  return (
    <nav className='px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black flex items-center justify-between'>
      {/* Brand */}
      <div className="tex-xl font-semibold tracking-light text-black dark:text-white">
        InsightForge
      </div>

      {/* Action */}
      <div className='flex items-center gap-4'>
        <ThemeToggle />

        <button
          onClick={handleLogout}
          className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition' aria-label='Logout'>
          <LogOut className='w-5 h-5 text-gray-700 dark:text-gray-300 cursor-pointer'/>
        </button>

      </div>
    </nav>
  )
}

export default Navbar;
