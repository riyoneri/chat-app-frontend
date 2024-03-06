import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserDto } from "../util/api";

interface AuthState {
  user?: UserDto;
  token?: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Omit<AuthState, "isAuthenticated">>) {
      state = { ...action.payload, isAuthenticated: true };
      return state;
    },
    logout(state) {
      delete state.token;
      delete state.user;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
