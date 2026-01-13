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
import ApplicantProfilePage from "./pages/ApplicantProfilePage";
import NavBar from "./layout/NavBar/NavBar";
import TalentApplicantView from "./pages/TalentApplicantView";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

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
          path="/search_applicants/talents"
          element={
            <ProtectedRoute>
              <TalentApplicantView />
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
          path="/events"
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

        <Route
          path="/applicants/:applicantId"
          element={
            <ProtectedRoute>
              <ApplicantProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
