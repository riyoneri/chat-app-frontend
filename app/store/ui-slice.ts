import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  rightSideBarOpened: boolean;
}

const initialState: UiState = { rightSideBarOpened: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openRightSideBar(state) {
      state.rightSideBarOpened = true;
    },
    closeRightSideBar(state) {
      state.rightSideBarOpened = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
