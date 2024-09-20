import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { LoginFormData } from "../../components/Login";

export interface AuthState {
  userName: string;
  userEmail: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userName: "",
  userEmail: "",
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const authSlice = createSlice({
  name: "dogs",
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
  },
});

export const {
  onAutenticateUser,
  onAutenticateUserSuccess,
  onAutenticateUserError,
} = authSlice.actions;

export default authSlice.reducer;
