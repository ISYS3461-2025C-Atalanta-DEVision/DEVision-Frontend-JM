import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "../../components/Alert";
import useAuthLoginStore from "../../store/auth.login.store";
import profileService from "../../services/profileService";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setAccessToken, setUser } = useAuthLoginStore();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");
      const expiresIn = searchParams.get("expires_in");
      const refreshExpiresIn = searchParams.get("refresh_expires_in");
      const errorParam = searchParams.get("error");

      if (errorParam) {
        setError(errorParam);
        setTimeout(() => navigate("/login?error=oauth_failed"), 3000);
        return;
      }

      if (accessToken && refreshToken) {
        try {
          // Store tokens first
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Store token expiry times
          const now = Date.now();
          if (expiresIn) {
            const accessExpiresAt = now + parseInt(expiresIn) * 1000;
            localStorage.setItem("accessExpiresAt", accessExpiresAt.toString());
          }
          if (refreshExpiresIn) {
            const refreshExpiresAt = now + parseInt(refreshExpiresIn) * 1000;
            localStorage.setItem("refreshExpiresAt", refreshExpiresAt.toString());
          }

          setAccessToken(accessToken);

          // Fetch user profile after storing tokens
          const userData = await profileService.getProfile();
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);

          // Redirect to dashboard
          navigate("/dashboard");
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
          setError("Failed to complete authentication. Please try again.");
          // Clear any stored tokens on error
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessExpiresAt");
          localStorage.removeItem("refreshExpiresAt");
          setTimeout(() => navigate("/login?error=oauth_failed"), 3000);
        }
      } else {
        setError("OAuth authentication failed. No tokens received.");
        setTimeout(() => navigate("/login?error=oauth_failed"), 3000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, setAccessToken, setUser]);

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
