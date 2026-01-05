import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex item-center justify-center text-center">
      <div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Page not found</p>
        <Link to="/" className="text-indigo-600 text-sm hover:underline">
          Go back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
