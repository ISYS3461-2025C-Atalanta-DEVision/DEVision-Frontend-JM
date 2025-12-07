import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import useLoginForm from "./useLoginForm";
import { useForm, validators } from "../../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { values, errors, handleChange, handleBlur, validateAll } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: [validators.required("Email is required"), validators.email()],
      password: [
        validators.required("Password is required"),
        validators.password(),
      ],
    }
  );

  const { toSignUp,error, loading, handleLoginSubmit } = useLoginForm(validateAll, values);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError("")}
          className="mb-4"
        />
      )}

      <form onSubmit={handleLoginSubmit}>
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

        <Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          placeholder="Enter your password"
          required
        />

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          Sign In
        </Button>

        <Button
          variant="secondary"
          size="lg"
          loading={loading}
          className="w-full mt-4"
          onClick={toSignUp}
        >
          Sign up
        </Button>

      </form>
    </div>
  );
}
