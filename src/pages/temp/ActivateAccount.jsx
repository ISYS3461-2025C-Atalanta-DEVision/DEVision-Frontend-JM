import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import authService from "../../services/authService";
import Button from "../../components/Button";
import Alert from "../../components/Alert";

const ActivateAccount = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activateAccount = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid activation link. No token provided.");
        return;
      }

      try {
        const response = await authService.activateAccount(token);
        setStatus("success");
        setMessage(
          response.message || "Your account has been successfully activated!"
        );
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "Failed to activate account. The link may have expired."
        );
      }
    };

    activateAccount();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-textBlack">DEVision</h1>
            <p className="text-gray-600 mt-2">Account Activation</p>
          </div>

          {status === "loading" && (
            <div className="py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Activating your account...</p>
            </div>
          )}

          {status === "success" && (
            <div className="py-4">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <Alert type="success" message={message} className="mb-6" />
              <Link to="/login">
                <Button variant="primary" size="lg" className="w-full">
                  Continue to Login
                </Button>
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="py-4">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <Alert type="error" message={message} className="mb-6" />
              <div className="space-y-3">
                <Link to="/register">
                  <Button variant="primary" size="lg" className="w-full">
                    Register Again
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;
