import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm, validators } from "../../hooks/useForm";
import useRegistrationForm from "./useRegistrationForm";
import Select from "../../components/Select";
import Alert from "../../components/Alert";

export default function RegistrationForm({ registerApi, getCountryApi }) {
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
      streetAddress: [validators.required("Street address is required")],
      city: [validators.required("City is required")],
    }
  );

  const {
    error,
    success,
    countries,
    loading,
    loadingCountries,
    handleRegisterSubmit,
  } = useRegistrationForm(validateAll, values, registerApi, getCountryApi);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-bgComponent rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold text-textBlack mb-6">
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

      {success && <Alert type="success" message={success} className="mb-4" />}

      <form onSubmit={handleRegisterSubmit}>
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
          Password must be at least 8 characters with 1 uppercase, 1 number, and
          1 special character.
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
            loadingCountries ? "Loading countries..." : "Select your country"
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
    </div>
  );
}
