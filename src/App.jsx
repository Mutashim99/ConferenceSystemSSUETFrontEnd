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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Author dashboard routes */}
        <Route path="/author/dashboard/submit" element={<SubmitPaper />} />
        <Route path="/author/dashboard/papers" element={<SubmittedPapers />} />
        <Route path="/author/dashboard/papers/:id" element={<PaperDetails />} />
        <Route
          path="/author/dashboard"
          element={<Navigate to="/author/dashboard/submit" />}
        />

        <Route
          path="/admin/dashboard/papers"
          element={<AdminSubmittedPapers />}
        />
        <Route
          path="/admin/dashboard/register-reviewer"
          element={<RegisterReviewer />}
        />
        <Route
          path="/admin/dashboard/assign-reviewer"
          element={<AssignReviewer />}
        />
        <Route
          path="/admin/dashboard"
          element={<Navigate to="/admin/dashboard/papers" />}
        />

        {/* Home fallback */}
        <Route
          path="/"
          element={
            <div className="text-center py-20 text-[#521028] font-bold text-3xl">
              Welcome to ICISCT
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
