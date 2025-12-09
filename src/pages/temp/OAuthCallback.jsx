import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "../../components/Alert";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(errorParam);
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Decode token to get user info
      try {
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        const user = {
          id: payload.userId || payload.sub,
          email: payload.email,
          role: payload.role,
        };
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error("Failed to decode token:", err);
      }

      navigate("/dashboard");
    } else {
      setError("OAuth authentication failed. No tokens received.");
      setTimeout(() => navigate("/login"), 3000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-textBlack">DEVision</h1>
            <p className="text-gray-600 mt-2">Processing Authentication</p>
          </div>

          {error ? (
            <div className="py-4">
              <Alert type="error" message={error} className="mb-4" />
              <p className="text-gray-600 text-sm">Redirecting to login...</p>
            </div>
          ) : (
            <div className="py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Completing sign in...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback;
