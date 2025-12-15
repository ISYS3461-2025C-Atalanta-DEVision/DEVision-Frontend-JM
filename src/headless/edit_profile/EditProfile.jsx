import React from "react";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import useProfileStore from "../../store/profile.store";
import { useForm, validators } from "../../hooks/useForm";
import Input from "../../components/Input";
import { Link, useSearchParams } from "react-router-dom";

export default function EditProfile({ currentData, setSearchParams }) {
  const companyData = currentData;
  const { values, errors, handleChange, handleBlur, validateAll } = useForm(
    {
      companyName: "",
      streetAddress: "",
      city: "",
      country: "",
      email: "",
      phoneNumber: "",
    },
    {
      companyName: [validators.required("Company name is required")],
      email: [validators.required("Email is required"), validators.email()],
      country: [validators.required("Country is required")],
      phoneNumber: [validators.phone()],
      streetAddress: [validators.required("Street address is required")],
      city: [validators.required("City is required")],
    }
  );

  return (
    <motion.div
      className="mt-6 bg-bgComponent rounded-lg shadow p-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h3 className="text-lg font-semibold text-textBlack mb-2">
        Company Profile
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Input
          label="Company Name"
          name="companyName"
          type="text"
          value={companyData.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.companyName}
          placeholder="Enter your company name"
          required
          className="w-[80%]"
        />
        <div>
          <label className="text-sm font-medium text-neutral6">Address</label>
          <p className="text-textBlack">
            {companyData?.streetAddress}, {companyData?.city}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-neutral6">Country</label>
          <p className="text-textBlack">{companyData?.country || "Not set"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-neutral6">
            Account Status
          </label>
          <p className="text-green-600 font-medium">Active</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-textBlack mb-2">
        Contact Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="text-sm font-medium text-neutral6">Email</label>
          <p className="text-textBlack">{companyData?.email}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-neutral6">
            Phone Number
          </label>
          <p className="text-textBlack">
            {companyData?.phoneNumber || "Not set"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev);
              next.delete("edit");
              return next;
            });
          }}
        >
          Cancel
        </Button>
        <Button variant="primary" size="sm">
          Save
        </Button>
      </div>
    </motion.div>
  );
}
