import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    signin: (_state) => {},
    signout: (_state) => ({}),
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
