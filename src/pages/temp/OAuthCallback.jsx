import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "../../components/Alert";
import useAuthLoginStore from "../../store/auth.login.store";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setAccessToken } = useAuthLoginStore();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const expiresIn = searchParams.get("expires_in");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(errorParam);
      setTimeout(() => navigate("/login?error=oauth_failed"), 3000);
      return;
    }

    if (accessToken && refreshToken) {
      // Store tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Store token expiry time
      if (expiresIn) {
        const expiryTime = Date.now() + parseInt(expiresIn) * 1000;
        localStorage.setItem("tokenExpiry", expiryTime.toString());
      }

      setAccessToken(accessToken);
      // Note: Access token is JWE (encrypted), not plain JWT
      // We can't decode it client-side - user info will be fetched from backend
      // The ProtectedRoute or Dashboard component should fetch user info using the token

      // Redirect to dashboard - it will fetch user info with the access token
      navigate("/dashboard");
    } else {
      setError("OAuth authentication failed. No tokens received.");
      setTimeout(() => navigate("/login?error=oauth_failed"), 3000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-bgComponent rounded-2xl shadow-xl p-8 text-center">
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
