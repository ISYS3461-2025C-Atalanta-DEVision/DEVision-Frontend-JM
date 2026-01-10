import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import JobPostPage from "./pages/JobPostPage";
import OAuthCallback from "./pages/OAuthCallback";
import ActivateAccount from "./pages/ActivateAccount";
import SubscriptionPayment from "./pages/SubscriptionPayment";
import EventPage from "./pages/EventsPage";
import ManageJobPostPage from "./pages/ManageJobPostPage";
import SearchApplicants from "./pages/SearchApplicants";
import NavBar from "./layout/NavBar/NavBar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activate/:token" element={<ActivateAccount />} />
        <Route path="/oauth2/callback" element={<OAuthCallback />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/search_applicants"
          element={
            <ProtectedRoute>
              <SearchApplicants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobpost"
          element={
            <ProtectedRoute>
              <JobPostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/jobspost"
          element={
            <ProtectedRoute>
              <ManageJobPostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event"
          element={
            <ProtectedRoute>
              <EventPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <SubscriptionPayment />
            </ProtectedRoute>
          }
        />

        {/* Redirect root to dashboard or login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 - Redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
