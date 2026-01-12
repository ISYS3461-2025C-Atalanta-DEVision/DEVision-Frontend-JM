import { motion } from "framer-motion";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import NavBar from "../layout/NavBar/NavBar";
import QuickStatsCard from "../components/QuickStatsCard";
import GridTable from "../headless/grid_table/GridTable";
import ImageHolder from "../components/ImageHolder";
import React, { useEffect, useRef, useState } from "react";
import TalentSearchAds from "../components/TalentSearchAds";
import { formatDateYear, countDaysFromDate } from "../utils/DateTime";
import eventService from "../services/eventService";
import profileService from "../services/profileService";
import useProfile from "../hooks/useProfile";
import EditProfile from "../headless/edit_profile/EditProfile";
import EventCard from "../components/EventCard";
import ConfirmBox from "../components/ConfirmBox";

const Dashboard = () => {
  const {
    profile: companyData,
    loading,
    error,
    setProfile,
    fetchCompanyProfile,
    paymentProcessing,
    handleCancelSubscription,
    cancelLoading,
    setCF,
    cfCancel,
  } = useProfile();

  const editProfileRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const shouldRefresh = searchParams.get("refresh") === "true";

  // Re-fetch profile when redirected from payment success
  useEffect(() => {
    if (shouldRefresh) {
      fetchCompanyProfile();
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("refresh");
        return next;
      });
    }
  }, [shouldRefresh, fetchCompanyProfile, setSearchParams]);

  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("edit");
      return next;
    });
  }, []);

  useEffect(() => {
    if (!isEditMode || !editProfileRef.current) return;

    const navbarHeight = 72;

    const elementTop =
      editProfileRef.current.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: elementTop - navbarHeight,
      behavior: "smooth",
    });
  }, [isEditMode]);

  return (
    <div className="min-h-screen bg-backGround pb-5">
      <NavBar activepage={"dashboard"} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Payment Processing Message */}
          {paymentProcessing && (
            <motion.div
              className="mt-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="animate-spin">&#9696;</span>
              Processing payment... Please wait.
            </motion.div>
          )}

          {/* Welcome Section */}
          {loading || paymentProcessing ? (
            <div className="flex items-center justify-center w-full h-full mt-6">
              <p className="text-neutral7 text-lg">Loading dashboard...</p>
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
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className=" flex-1 mt-6 mb-6 bg-bgComponent rounded-lg shadow p-6 flex flex-row gap-3">
                <ImageHolder
                  className="w-24 h-24 rounded-full mr-4 object-cover border-2 border-primary"
                  src={companyData?.avatarUrl}
                  alt="Company Avatar"
                />

                <div className="flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-textBlack mb-2">
                    Welcome, {companyData?.companyName || "Company"}!
                  </h2>
                  <p className="text-neutral6">
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

                {companyData?.subscriptionType === "PREMIUM" ? (
                  <>
                    <h3 className="text-neutral6 text-lg">
                      Available until:{" "}
                      {formatDateYear(companyData?.subscriptionEndDate)}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="self-start text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => {
                        setCF({
                          title: `Your subscriptions has ${countDaysFromDate(
                            companyData?.subscriptionEndDate
                          )} day left. Are you sure you want to cancel?`,
                          subTitle: "Press Cancel to continue",
                          buttons: [
                            {
                              type: "return",
                              content: "Return",
                              onClick: () => setCF(null),
                            },
                            {
                              type: "danger",
                              content: "Cancel",
                              onClick: () => {
                                setCF(null);
                                handleCancelSubscription();
                              },
                            },
                          ],
                        });
                      }}
                      disabled={cancelLoading}
                    >
                      {cancelLoading ? "Cancelling..." : "Cancel Subscription"}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="self-start"
                    onClick={() => navigate("/payment")}
                  >
                    Upgrade Plan
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Quick Actions Section */}
          <GridTable
            CardComponent={QuickStatsCard}
            fetchItemAPI={profileService.getQuickActionStats}
            className="gap-6"
          />

          {/* Profile Section */}
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-neutral6 text-lg">Loading profile...</p>
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
                  <p
                    className={` ${
                      companyData?.aboutUs ? "text-textBlack" : "text-neutral6"
                    } font-semibold text-xl h-full`}
                  >
                    {companyData?.aboutUs ||
                      "Add your company vision in update profile section."}
                  </p>
                </div>

                <div className="flex flex-col justify-end items-end gap-2 px-2">
                  <h3 className="text-2xl font-semibold text-primary">
                    What we looking for
                  </h3>
                  <p
                    className={` ${
                      companyData?.whoWeAreLookingFor
                        ? "text-textBlack"
                        : "text-neutral6"
                    } font-semibold text-xl h-full`}
                  >
                    {companyData?.whoWeAreLookingFor ||
                      "Update in profile edit section"}
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
                  {companyData?.streetAddress && companyData?.city ? (
                    <p className="text-textBlack">
                      {companyData?.streetAddress}, {companyData?.city}
                    </p>
                  ) : (
                    <p className="text-neutral6 font-semibold">Not set</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral6">
                    Country
                  </label>
                  {companyData?.country ? (
                    <p className="text-textBlack">{companyData?.country}</p>
                  ) : (
                    <p className="text-neutral6 font-semibold">Not set</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral6">
                    Joined Devision since
                  </label>
                  <p className="text-textBlack">
                    {companyData?.createdAt ? (
                      <>
                        {formatDateYear(companyData.createdAt)} –{" "}
                        <span className="font-semibold text-primary">
                          {countDaysFromDate(companyData.createdAt)} days ago
                        </span>
                      </>
                    ) : (
                      "Not set"
                    )}
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
                  {companyData?.phoneNumber ? (
                    <p className="text-textBlack">{companyData?.phoneNumber}</p>
                  ) : (
                    <p className="text-neutral6 font-semibold">Not set</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <Link to="/dashboard?edit=true">Edit Profile</Link>
                </Button>
              </div>
            </motion.div>
          ) : (
            <div ref={editProfileRef}>
              <EditProfile
                currentData={companyData}
                setSearchParams={setSearchParams}
                setNewProfile={setProfile}
              />
            </div>
          )}

          {/* only show TalentSearchAds for FREE user */}
          {companyData?.subscriptionType !== "PREMIUM" &&
            (loading ? (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-neutral6 text-lg">
                  Loading advertisements...
                </p>
              </div>
            ) : (
              <motion.div
                className="mt-6 bg-bgComponent rounded-lg shadow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <TalentSearchAds price={30} />
              </motion.div>
            ))}

          <GridTable
            CardComponent={EventCard}
            fetchItemAPI={eventService.getCompanyEvents}
            className="gap-6 mt-6"
          />
        </div>
      </main>

      {cfCancel !== null && (
        <ConfirmBox
          buttons={cfCancel.buttons}
          title={cfCancel.title}
          subTitle={cfCancel.subTitle}
        />
      )}
    </div>
  );
};

export default Dashboard;
