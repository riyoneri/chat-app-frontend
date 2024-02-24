import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  userData?: {
    _id: string;
    username: string;
    emoji: string;
  };
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ _id: string; username: string; emoji: string }>,
    ) {
      state.userData = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
