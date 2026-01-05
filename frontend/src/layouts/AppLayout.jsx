import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
          <Navbar />
          <main className="max-w-7xl mx-auto px-6 py-6">
              <Outlet />
          </main>
    </div>
  )
}

export default AppLayout;
