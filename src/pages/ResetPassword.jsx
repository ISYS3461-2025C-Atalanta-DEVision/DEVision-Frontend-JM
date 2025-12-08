import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm, validators } from "../hooks/useForm";
import authService from "../services/authService";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { values, errors, handleChange, handleBlur, validateAll } = useForm(
    {
      password: "",
      confirmPassword: "",
    },
    {
      password: [
        validators.required("Password is required"),
        validators.password(),
      ],
      confirmPassword: [
        validators.required("Please confirm your password"),
        validators.confirmPassword("password"),
      ],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateAll()) {
      return;
    }

    if (!token) {
      setError("Invalid reset link. No token provided.");
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, values.password);
      setSuccess("Your password has been successfully reset!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. The link may have expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-textBlack">DEVision</h1>
            <p className="text-gray-600 mt-2">Job Manager Portal</p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600 mb-6">Enter your new password below.</p>

          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError("")}
              className="mb-4"
            />
          )}

          {success && (
            <Alert type="success" message={success} className="mb-4" />
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="New Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              placeholder="Enter new password"
              required
            />

            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              placeholder="Confirm new password"
              required
            />

            <div className="text-xs text-neutral6 mb-4">
              Password must be at least 8 characters with 1 uppercase, 1 number,
              and 1 special character.
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Reset Password
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-primary hover:text-primary2 font-medium"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
