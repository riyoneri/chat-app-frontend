import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<UserDto> = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (_state, action: PayloadAction<UserDto>) => action.payload,
    signout: (_state) => ({}),
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
