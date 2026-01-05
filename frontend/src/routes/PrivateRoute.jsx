import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <span className='text-sm text-gray-500'>Checking session...</span>
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute;
