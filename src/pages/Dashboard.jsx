import { motion } from "framer-motion";
import Button from "../components/Button";
import NavBar from "../layout/NavBar/NavBar";
import QuickStatsCard from "../components/QuickStatsCard";
import GridTable from "../headless/grid_table/GridTable";
import ImageHolder from "../components/ImageHolder";
import Default from "../assets/photo/company_default.png";

import useDashboard from "../hooks/useDashboard";
import dashboardServices from "../services/companyServices";

import useAuthLoginStore from "../store/auth.login.store";

const Dashboard = () => {
  const { user } = useAuthLoginStore();
  const { companyData, loading, error } = useDashboard(
    dashboardServices,
    user?.id
  );

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
            <div className="mt-6 mb-6 bg-white rounded-lg shadow p-6">
              <p className="text-error text-center w-full">{error}</p>
            </div>
          ) : (
            <motion.div
              className="mt-6 mb-6 bg-white rounded-lg shadow p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex flex-row gap-3">
                <ImageHolder
                  className="w-24 h-24 rounded-full mr-4 object-cover border-2 border-primary"
                  src={companyData?.avatarURL || Default}
                  alt="Company Avatar"
                />

                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-textBlack mb-2">
                    Welcome, {companyData?.name || "Company"}!
                  </h2>
                  <p className="text-gray-600">
                    You are logged in as{" "}
                    <span className="font-medium">
                      {companyData?.contactEmail}
                    </span>
                  </p>
                  <p className="text-sm text-neutral6 mt-1">
                    Role:{" "}
                    <span className="font-medium">
                      {companyData?.role || "COMPANY"}
                    </span>{" "}
                    | Country:{" "}
                    <span className="font-medium">
                      {companyData?.country || "N/A"}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Actions Section */}
          <GridTable
            CardComponent={QuickStatsCard}
            fetchItemAPI={dashboardServices.getQuickActionStats}
            className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          />

          {/* Profile Section */}
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-gray-600 text-lg">Loading profile...</p>
            </div>
          ) : error ? (
            <div className="mt-6 mb-6 bg-white rounded-lg shadow p-6">
              <p className="text-error text-center w-full">{error}</p>
            </div>
          ) : (
            <motion.div
              className="mt-6 bg-white rounded-lg shadow p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="text-lg font-semibold text-textBlack mb-4">
                Company Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-neutral6">
                    Company Name
                  </label>
                  <p className="text-textBlack">
                    {companyData?.name || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral6">
                    Email
                  </label>
                  <p className="text-textBlack">{companyData?.contactEmail}</p>
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
                    Account Status
                  </label>
                  <p className="text-green-600 font-medium">Active</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
