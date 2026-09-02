import { createSlice } from "@reduxjs/toolkit";

// Initial state from localStorage
const userFromStorage = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isAuthenticated: localStorage.getItem("auth") === "true" || false,
  name: userFromStorage?.username || '',
  emailid: userFromStorage?.emailid || '',
  profileImage: userFromStorage?.profileImage || '',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload.user; // 👈 data is nested under `user`

      state.name = user.username;
      state.emailid = user.emailid;
      state.profileImage = user.profileImage;
      state.isAuthenticated = true;

      // Save to localStorage for refresh persistence
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: (state) => {
      state.name = '';
      state.emailid = '';
      state.profileImage = '';
      state.isAuthenticated = false;

      localStorage.removeItem("auth");
      localStorage.removeItem("user");
    },

    // 👇 optional: call this if needed to rehydrate Redux store
    setUserFromStorage: (state, action) => {
      const user = action.payload;

      state.name = user.username;
      state.emailid = user.emailid;
      state.profileImage = user.profileImage;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
