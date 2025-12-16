import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import NavBar from "../layout/NavBar/NavBar";
import QuickStatsCard from "../components/QuickStatsCard";
import GridTable from "../headless/grid_table/GridTable";
import ImageHolder from "../components/ImageHolder";
import Default from "../assets/photo/company_default.png";
import React, { useEffect } from "react";

import { formatDateYear } from "../utils/DateTime";

import profileService from "../services/profileService";

import useProfileStore from "../store/profile.store";
import EditProfile from "../headless/edit_profile/EditProfile";

const Dashboard = () => {
  const {
    profile: companyData,
    loading,
    error,
    setProfile,
  } = useProfileStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const isEditMode = searchParams.get("edit") === "true";

  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("edit");
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-backGround">
      <NavBar activepage={"dashboard"} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-gray-600 text-lg">Loading dashboard...</p>
            </div>
          ) : error ? (
            <div className="mt-6 mb-6 bg-bgComponent rounded-lg shadow p-6">
              <p className="text-error text-center w-full">{error}</p>
            </div>
          ) : (
            <motion.div
              className="flex flex-row gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className=" flex-1 mt-6 mb-6 bg-bgComponent rounded-lg shadow p-6 flex flex-row gap-3">
                <ImageHolder
                  className="w-24 h-24 rounded-full mr-4 object-cover border-2 border-primary"
                  src={companyData?.avatarURL || Default}
                  alt="Company Avatar"
                />

                <div className="flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-textBlack mb-2">
                    Welcome, {companyData?.companyName || "Company"}!
                  </h2>
                  <p className="text-gray-600">
                    You are logged in as{" "}
                    <span className="font-medium">{companyData?.email}</span>
                  </p>
                  <p className="text-sm text-neutral6 mt-1">
                    Country:{" "}
                    <span className="font-medium">
                      {companyData?.country || "N/A"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-6 mb-6 bg-bgComponent rounded-lg shadow p-6 gap-2 ">
                <h2 className="text-lg font-bold text-textBlack">
                  Subscrition plan
                </h2>

                <h1 className="text-2xl font-extrabold text-primary">
                  {companyData?.subscriptionType || "Company"}
                </h1>

                <Button variant="outline" size="sm" className="self-start">
                  Upgrade Plan
                </Button>
              </div>
            </motion.div>
          )}

          {/* Quick Actions Section */}
          <GridTable
            CardComponent={QuickStatsCard}
            fetchItemAPI={profileService.getQuickActionStats}
            className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          />

          {/* Profile Section */}
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-gray-600 text-lg">Loading profile...</p>
            </div>
          ) : error ? (
            <div className="mt-6 mb-6 bg-bgComponent rounded-lg shadow p-6">
              <p className="text-error text-center w-full">{error}</p>
            </div>
          ) : !isEditMode ? (
            <motion.div
              className="mt-6 bg-bgComponent rounded-lg shadow p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                
                <div className="flex flex-col justify-start items-start gap-2 px-2">
                  <h3 className="text-2xl font-semibold text-primary">
                    Our vision
                  </h3>
                  <p className={` ${companyData?.aboutUs ? "text-textBlack" : "text-neutral6"} font-semibold text-xl h-full`}>
                    {companyData?.aboutUs || "Add your company vision in update profile section."}
                  </p>
                </div>

                <div className="flex flex-col justify-end items-end gap-2 px-2">
                  <h3 className="text-2xl font-semibold text-primary">
                    What we looking for
                  </h3>
                  <p className={` ${companyData?.whoWeAreLookingFor ? "text-textBlack" : "text-neutral6"} font-semibold text-xl h-full`}>
                    {companyData?.whoWeAreLookingFor || "Update in profile edit section"}
                  </p>
                </div>
              </div>

              <hr className="my-6 border-t-2 border-primary2" />

              <h3 className="text-lg font-semibold text-textBlack mb-2">
                Company Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="text-sm font-medium text-neutral6">
                    Company Name
                  </label>
                  <p className="text-textBlack">
                    {companyData?.companyName || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral6">
                    Address
                  </label>
                  <p className="text-textBlack">
                    {companyData?.streetAddress}, {companyData?.city}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral6">
                    Country
                  </label>
                  <p className="text-textBlack">
                    {companyData?.country || "Not set"}
                  </p>
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
                <div>
                  <label className="text-sm font-medium text-neutral6">
                    Email
                  </label>
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

              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <Link to="/dashboard?edit=true">Edit Profile</Link>
                </Button>
              </div>
            </motion.div>
          ) : (
            <EditProfile
              currentData={companyData}
              setSearchParams={setSearchParams}
              setNewProfile={setProfile}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
