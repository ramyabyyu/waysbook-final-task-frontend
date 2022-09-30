import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import bookSlice from "../features/book/bookSlice";
import profileSlice from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    book: bookSlice,
  },
});
