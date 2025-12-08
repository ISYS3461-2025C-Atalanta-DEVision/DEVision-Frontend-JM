import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm, validators } from "../hooks/useForm";
import authService from "../services/authService";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import Alert from "../components/Alert";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const { values, errors, handleChange, handleBlur, validateAll } = useForm(
    {
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      country: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
    },
    {
      email: [validators.required("Email is required"), validators.email()],
      password: [
        validators.required("Password is required"),
        validators.password(),
      ],
      confirmPassword: [
        validators.required("Please confirm your password"),
        validators.confirmPassword("password"),
      ],
      companyName: [validators.required("Company name is required")],
      country: [validators.required("Country is required")],
      phoneNumber: [validators.phone()],
    }
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await authService.getCountries();
        setCountries(response.data || []);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
        setCountries([
          "Vietnam",
          "Singapore",
          "Thailand",
          "United States",
          "Australia",
        ]);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setSuccess('');

  //   if (!validateAll()) {
  //     return;
  //   }

  //   setLoading(true);
  //   const result = await register({
  //     email: values.email,
  //     password: values.password,
  //     companyName: values.companyName,
  //     country: values.country,
  //     phoneNumber: values.phoneNumber || undefined,
  //     streetAddress: values.streetAddress || undefined,
  //     city: values.city || undefined,
  //   });
  //   setLoading(false);

  //   if (result.success) {
  //     setSuccess('Registration successful! Please check your email to activate your account.');
  //     setTimeout(() => navigate('/login'), 3000);
  //   } else {
  //     setError(result.error);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-textBlack">DEVision</h1>
            <p className="text-gray-600 mt-2">Job Manager Portal</p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Create Account
          </h2>

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
              label="Company Name"
              name="companyName"
              type="text"
              value={values.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.companyName}
              placeholder="Enter your company name"
              required
            />

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                placeholder="Create a password"
                required
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="text-xs text-neutral6 mb-4 -mt-2">
              Password must be at least 8 characters with 1 uppercase, 1 number,
              and 1 special character.
            </div>

            <Select
              label="Country"
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.country}
              options={countries}
              placeholder={
                loadingCountries
                  ? "Loading countries..."
                  : "Select your country"
              }
              disabled={loadingCountries}
              required
            />

            <Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phoneNumber}
              placeholder="+84912345678"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                type="text"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.city}
                placeholder="Enter your city"
              />

              <Input
                label="Street Address"
                name="streetAddress"
                type="text"
                value={values.streetAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.streetAddress}
                placeholder="Enter street address"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-4"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary2 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
