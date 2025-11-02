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
      <div className="flex h-screen w-full animate-pulse">
        {/* ===== Sidebar Skeleton ===== */}
        <div className="hidden w-64 bg-gray-200 p-6 md:block">
          {/* Sidebar Logo/Title */}
          <div className="mb-10 h-8 w-3/4 rounded-md bg-gray-300"></div>
          
          {/* Sidebar Nav Links */}
          <div className="space-y-4">
            <div className="h-6 w-full rounded-md bg-gray-300"></div>
            <div className="h-6 w-full rounded-md bg-gray-300"></div>
            <div className="h-6 w-5/6 rounded-md bg-gray-300"></div>
            <div className="h-6 w-full rounded-md bg-gray-300"></div>
          </div>
        </div>

        {/* ===== Main Content Skeleton ===== */}
        <div className="flex-1">
          {/* Top Navbar Skeleton */}
          <div className="flex h-16 items-center justify-between bg-gray-100 px-8">
            {/* Searchbar */}
            <div className="h-8 w-1/3 rounded-md bg-gray-300"></div>
            {/* Profile/Avatar */}
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          </div>

          {/* Main Content Area */}
          <div className="p-8">
            {/* Page Title */}
            <div className="mb-6 h-8 w-1/4 rounded-md bg-gray-300"></div>

            {/* Content Cards Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="h-40 rounded-lg bg-gray-200"></div>
              <div className="h-40 rounded-lg bg-gray-200"></div>
              <div className="h-40 rounded-lg bg-gray-200"></div>
            </div>

            {/* Content Table/List */}
            <div className="mt-8">
              <div className="mb-4 h-6 w-1/5 rounded-md bg-gray-300"></div>
              <div className="space-y-3 rounded-lg bg-gray-200 p-4">
                <div className="h-5 w-full rounded-md bg-gray-300"></div>
                <div className="h-5 w-full rounded-md bg-gray-300"></div>
                <div className="h-5 w-5/6 rounded-md bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
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
