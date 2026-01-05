import React from "react";
import { motion } from "framer-motion";
import useProfileStore from "../../store/profile.store";
import { useForm, validators } from "../../hooks/useForm";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import ImageHolder from "../../components/ImageHolder";
import { Link, useSearchParams } from "react-router-dom";
import { formatDateYear } from "../../utils/DateTime";

import authService from "../../services/authService";
import profileService from "../../services/profileService";

import useEditProfile from "./useEditProfile";
import Default from "../../assets/photo/company_default.png";
import AvatarModal from "../../components/AvatarModal";
import useProfile from "../../hooks/useProfile";
import Alert from "../../components/Alert";

export default function EditProfile({
  currentData,
  setSearchParams,
  setNewProfile,
}) {
  const companyData = currentData;

  const { fetchCompanyProfile } = useProfile();
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateAll,
    handleFileChange,
    setValues,
  } = useForm(
    {
      ...companyData,
      whoWeAreLookingFor: companyData?.whoWeAreLookingFor ?? "",
      aboutUs: companyData?.aboutUs ?? "",
    },
    {
      companyName: [validators.required("Company name is required")],
      country: [validators.required("Country is required")],
      phoneNumber: [validators.phone()],
      streetAddress: [validators.required("Street address is required")],
      city: [validators.required("City is required")],
      email: [validators.required("Email is required"), validators.email()],
    }
  );

  const {
    countries,
    loadingCountries,
    isSaving,
    confirmationMessage,
    handleSubmit,
    avatarModal,
    setAvatarModal,
    handleAvatarSave,
    isSavingAvatar,
    avatarMessage,
  } = useEditProfile(
    profileService.editProfile,
    profileService.editAvatar,
    authService.getCountries,
    values,
    validateAll,
    setNewProfile,
    fetchCompanyProfile,
    setValues,
    setSearchParams
  );

  return (
    <div className="relative">
      <motion.div
        className="mt-6 bg-bgComponent rounded-lg shadow p-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center gap-3 justify-center mb-8 w-full">
          <ImageHolder
            className="w-36 h-36 rounded-full object-cover border-2 border-primary"
            src={values?.avatarUrl}
            alt="Company Avatar"
          />

          <Button
            size="sm"
            onClick={() => document.getElementById("avatar-upload").click()}
            className="text-sm bg-neutral6 font-semibold text-primary transition"
          >
            Change profile photo
          </Button>

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              const previewUrl = URL.createObjectURL(file);
              setAvatarModal(previewUrl);

              e.target.value = "";
            }}
          />

          {avatarMessage && <Alert type={avatarMessage.type} message={avatarMessage.message} />}
          
        </div>

        <hr className="my-6 border-t-2 border-neutral3" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="flex flex-col justify-start items-start gap-2 px-2">
            <h3 className="text-2xl font-semibold text-primary">Our vision</h3>
            <TextArea
              name="aboutUs"
              type="text"
              value={values.aboutUs}
              rows={5}
              onChange={handleChange}
              placeholder="Update your company vision"
              className="w-[80%]"
            />
          </div>

          <div className="flex flex-col justify-start items-end gap-2 px-2">
            <h3 className="text-2xl font-semibold text-primary">
              What we looking for
            </h3>
            <TextArea
              name="whoWeAreLookingFor"
              type="text"
              rows={5}
              value={values.whoWeAreLookingFor}
              onChange={handleChange}
              placeholder="What you looking for"
              className="w-[80%]"
            />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-textBlack mb-2">
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
            className="w-[80%]"
          />
          <div className="flex flex-row gap-5">
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
          </div>
          <div>
            <Select
              label="Country"
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.country}
              options={loadingCountries ? ["Loading..."] : countries}
              placeholder={"Select your country"}
              required
              className="w-[80%]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral6">
              Joined Devision since
            </label>
            <p className="text-textBlack">
              {companyData?.createdAt
                ? formatDateYear(companyData.createdAt)
                : "Not set"}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-textBlack mb-2">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
            className="w-[80%]"
          />

          <div>
            <Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phoneNumber}
              placeholder="+84912345678"
              required
              className="w-[80%]"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-4">
          {confirmationMessage ? (
            <>
              <Alert type={confirmationMessage.type} message={confirmationMessage.message} />
            </>
          ) : (
            <></>
          )}

          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                next.delete("edit");
                return next;
              });
            }}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={() => handleSubmit()}>
            {isSaving ? (
              <>
                <i className="ri-loader-4-line animate-spin" />
                Saving changes...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </motion.div>

      {avatarModal && (
        <AvatarModal
          image={avatarModal}
          onSave={handleAvatarSave}
          onClose={() => {
            URL.revokeObjectURL(avatarModal);
            setAvatarModal(null);
          }}
          isSaving={isSavingAvatar}
        />
      )}
    </div>
  );
}
