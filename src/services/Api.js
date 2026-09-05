import axios from "axios";
import API_URL from "../config/apiConfig";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Call backend logout to clear cookie
        await axios.post(`${API_URL}/api/auth/logout`,
          {},
          { withCredentials: true },
        );
      } catch (logoutError) {
        console.log("Logout API failed" + logoutError.message);
      }

      // Redirect after clearing session
      window.location.replace("/session-expired");
    }

    return Promise.reject(error);
  },
);

export default api;
