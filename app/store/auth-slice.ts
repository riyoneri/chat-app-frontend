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
    login: (
      state,
      action: PayloadAction<Omit<AuthState, "isAuthenticated">>,
    ) => ({
      ...action.payload,
      isAuthenticated: !!(action.payload?.token && action.payload?.user),
    }),
    logout: () => initialState,
  },
});

export const authActions = authSlice.actions;

export default authSlice;
