import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, validators } from "../hooks/useForm";
import authService from "../services/authService";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { values, errors, handleChange, handleBlur, validateAll } = useForm(
    {
      email: "",
    },
    {
      email: [validators.required("Email is required"), validators.email()],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateAll()) {
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword(values.email);
      setSuccess("Password reset instructions have been sent to your email.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send reset email. Please try again."
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
            Forgot Password
          </h2>
          <p className="text-gray-600 mb-6">
            Enter your email address and we&apos;ll send you instructions to
            reset your password.
          </p>

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
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              placeholder="Enter your email"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Send Reset Link
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

export default ForgotPassword;
