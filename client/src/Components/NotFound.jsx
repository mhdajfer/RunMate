import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md text-center">
        <div className="flex justify-center mb-4">
          {/* Simple 404 text icon */}
          <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center">
            <span className="text-2xl font-bold text-red-500">404</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-6">
          The page you are looking for doesnt exist or has been moved.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Check the URL or try navigating back to the homepage.
        </p>

        <div className="flex justify-center">
          <button
            className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors"
            onClick={() => navigate("/admin/dashboard")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
