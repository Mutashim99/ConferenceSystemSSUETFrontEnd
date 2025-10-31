import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubmitPaper from "./pages/author/SubmitPaper";
import SubmittedPapers from "./pages/author/SubmittedPapers";
import PaperDetails from "./pages/author/PaperDetails";
import AdminSubmittedPapers from "./pages/admin/AdminSubmittedPapers";
import RegisterReviewer from "./pages/admin/RegisterReviewer";
import AssignReviewer from "./pages/admin/AssignReviewer";
import { Home } from "./pages/Home";
import ReviewerSubmittedPapers from "./pages/reviewer/ReviewerSubmittedPapers";
import ReviewerLayout from "./components/ReviewerLayout";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // Get the fetchUser action from the store.
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    // When the app loads (only once), call fetchUser
    // to check for an existing session.
    fetchUser();
  }, [fetchUser]);

  return (
    <Router>
      <Navbar />
      <div className="bg-gray-50 min-h-[calc(100vh-80px)]">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* AUTHOR DASHBOARD (Protected) */}
          <Route
            path="/author/dashboard/submit"
            element={
              // **FIX:** Re-enabled the ProtectedRoute.
              <ProtectedRoute allowedRoles={["AUTHOR"]}>
                <SubmitPaper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/author/dashboard/papers"
            element={
              <ProtectedRoute allowedRoles={["AUTHOR"]}>
                <SubmittedPapers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/author/dashboard/papers/:id"
            element={
              <ProtectedRoute allowedRoles={["AUTHOR"]}>
                <PaperDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/author/dashboard"
            element={<Navigate to="/author/dashboard/submit" />}
          />

          {/* ADMIN DASHBOARD (Protected) */}
          <Route
            path="/admin/dashboard/papers"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminSubmittedPapers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/register-reviewer"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <RegisterReviewer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/assign-reviewer"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AssignReviewer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={<Navigate to="/admin/dashboard/papers" />}
          />

          {/* REVIEWER DASHBOARD (Protected) */}
          <Route
            path="/reviewer/*"
            element={
              <ProtectedRoute allowedRoles={["REVIEWER"]}>
                <ReviewerLayout>
                  <Routes>
                    <Route path="papers" element={<ReviewerSubmittedPapers />} />
                    <Route path="/" element={<Navigate to="papers" />} />
                  </Routes>
                </ReviewerLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback for any other route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;