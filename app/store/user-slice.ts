import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { _id: "", username: "", emoji: "" },
  },
  reducers: {
    login(
      state,
      action: PayloadAction<{ _id: string; username: string; emoji: string }>,
    ) {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
