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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Author dashboard routes */}
        <Route path="/author/dashboard/submit" element={<SubmitPaper />} />
        <Route path="/author/dashboard/papers" element={<SubmittedPapers />} />

        {/* Default dashboard redirect */}
        <Route
          path="/author/dashboard"
          element={<Navigate to="/author/dashboard/submit" />}
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
