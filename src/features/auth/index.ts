import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { LoginFormData } from "../../components/Login";

interface AuthSliceState {
  userName: string;
  userEmail: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthSliceState = {
  userName: "",
  userEmail: "",
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onAutenticateUser: (state, _action: PayloadAction<LoginFormData>) => {
      state.userName = "";
      state.userEmail = "";
      state.isLoading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    onAutenticateUserSuccess: (state, action: PayloadAction<LoginFormData>) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    onAutenticateUserError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    onLogoutUser: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    onLogoutUserSuccess: (state) => {
      state.userName = "";
      state.userEmail = "";
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = null;
    },
    onLogoutUserError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  onAutenticateUser,
  onAutenticateUserSuccess,
  onAutenticateUserError,
  onLogoutUser,
  onLogoutUserSuccess,
  onLogoutUserError,
} = authSlice.actions;

export default authSlice.reducer;
