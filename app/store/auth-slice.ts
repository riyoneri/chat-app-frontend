import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserDto } from "../util/api";

interface AuthState {
  user?: UserDto;
  token?: string;
}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState>) {
      state = action.payload;
    },
    logout(state) {
      delete state.token;
      delete state.user;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
