import { create } from "zustand";
import api from "../api/axios";

const useAuthStore = create((set, get) => ({
  user: null,
  // Start with loading: true. This is critical.
  // It prevents ProtectedRoute from redirecting to /login
  // before we've had a chance to check if a user is already
  // logged in via a cookie (in the fetchUser function).
  loading: true,
  error: null,

  /**
   * Attempts to log in the user.
   * Returns the user object on success, or false on failure.
   */
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/login", { email, password });
      set({ user: res.data.user, loading: false });
      // Return the user object so the Login component can navigate.
      return res.data.user;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
      return false; // Return false on failure
    }
  },

  /**
   * Checks if a user is already logged in (e.g., via a session cookie).
   * This is called when the app first loads.
   */
  fetchUser: async () => {
    // Only set loading if it's not already true
    if (!get().loading) set({ loading: true });
    try {
      // **FIX:** Used the configured 'api' instance, not 'axios' directly.
      const res = await api.get("/auth/me");
      set({ user: res.data, loading: false });
    } catch (err) {
      // If /auth/me fails (e.g., 401), it means no user is logged in.
      set({ user: null, loading: false });
    }
  },

  /**
   * Logs the user out.
   */
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    // Always set user to null, even if API call fails.
    set({ user: null });
  },

  /**
   * Attempts to register a new user.
   * Returns the new user object on success, or false on failure.
   */
  register: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/register", payload);
      // Log in the new user immediately after registration.
      set({ user: res.data.user, loading: false });
      // Return the user object so the Register component can navigate.
      return res.data.user;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      set({ error: message, loading: false });
      return false; // Return false on failure
    }
  },
}));

export default useAuthStore;
