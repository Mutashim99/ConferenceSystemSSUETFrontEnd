import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute  ({ children, allowedRoles })  {
  const { user, loading } = useAuthStore();

  // **CRITICAL:** This 'loading' check is why we set
  // 'loading: true' in the store initially. While 'fetchUser'
  // is running, this will show a loading message instead of
  // prematurely redirecting to /login.
  if (loading) {
    return (
      <div className="text-center py-20 text-[#521028] font-semibold text-xl">
        Checking authentication...
      </div>
    );
  }

  // If loading is done and there's still no user, redirect to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the route requires specific roles and the user doesn't have one,
  // redirect them. (Here, redirecting to /login, but you
  // could redirect to a 403 "Forbidden" page).
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // If all checks pass, render the child component (the protected page).
  return children;
};
