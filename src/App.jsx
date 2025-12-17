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
import ActivateAccount from "./pages/temp/ActivateAccount";

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

        {/* <Route
          path="/your-applicants"
          element={
            <ProtectedRoute>

            </ProtectedRoute>
          }
        />

        <Route
          path="/your-events"
          element={
            <ProtectedRoute>

            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/jobpost"
          element={
            <ProtectedRoute>
              <JobPostPage />
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
