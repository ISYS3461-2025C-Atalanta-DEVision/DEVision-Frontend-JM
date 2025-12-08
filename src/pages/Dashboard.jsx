import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import NavBar from "../layout/NavBar/NavBar";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar company_name={user?.companyName} handleLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-textBlack mb-2">
              Welcome, {user?.companyName || "Company"}!
            </h2>
            <p className="text-gray-600">
              You are logged in as{" "}
              <span className="font-medium">{user?.email}</span>
            </p>
            <p className="text-sm text-neutral6 mt-1">
              Role:{" "}
              <span className="font-medium">{user?.role || "COMPANY"}</span> |
              Country:{" "}
              <span className="font-medium">{user?.country || "N/A"}</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Job Posts"
              description="Manage your job listings"
              icon={
                <svg
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              count="0"
              linkText="View all jobs"
            />
            <DashboardCard
              title="Applications"
              description="Review applicant submissions"
              icon={
                <svg
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
              count="0"
              linkText="View applications"
            />
            <DashboardCard
              title="Search Applicants"
              description="Find potential candidates"
              icon={
                <svg
                  className="h-8 w-8 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
              count=""
              linkText="Search now"
            />
            <DashboardCard
              title="Subscription"
              description="Manage premium features"
              icon={
                <svg
                  className="h-8 w-8 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              }
              count={user?.isPremium ? "Active" : "Free"}
              linkText="View plans"
            />
          </div>

          {/* Profile Section */}
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-textBlack mb-4">
              Company Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-neutral6">
                  Company Name
                </label>
                <p className="text-textBlack">
                  {user?.companyName || "Not set"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral6">
                  Email
                </label>
                <p className="text-textBlack">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral6">
                  Country
                </label>
                <p className="text-textBlack">{user?.country || "Not set"}</p>
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
          </div>
        </div>
      </main>
    </div>
  );
};

const DashboardCard = ({ title, description, icon, count, linkText }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        {icon}
        {count && (
          <span className="text-2xl font-bold text-textBlack">{count}</span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-textBlack">{title}</h3>
      <p className="text-sm text-neutral6 mb-4">{description}</p>
      <button className="text-primary hover:text-primary2 text-sm font-medium">
        {linkText} →
      </button>
    </div>
  );
};

export default Dashboard;
