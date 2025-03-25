import { useNavigate } from "react-router-dom";

export default function Activation() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md text-center">
        <div className="flex justify-center mb-4">
          {/* Simple CSS checkmark */}
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <div className="h-8 w-4 border-r-2 border-b-2 border-green-500 rotate-45 mt-[-4px]"></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Account Activated!
        </h1>

        <p className="text-gray-600 mb-6">
          Your account has been successfully activated and is ready to use.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Thank you for confirming your email address. You can now access all
          features of your account.
        </p>

        <div className="flex justify-center">
          <button
            className="px-8 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
            onClick={() => navigate("/login")}
          >
            Continue to Login
          </button>
        </div>
      </div>
    </div>
  );
}
