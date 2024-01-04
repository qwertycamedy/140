import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  burger: false,
  profileModal: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setBurger: (state, action) => {
      state.burger = action.payload;
    },
    setProfileModal: (state, action) => {
      state.profileModal = action.payload;
    },
  },
});

export const { setBurger, setProfileModal } = headerSlice.actions;
export const headerSel = state => state.header;

export default headerSlice.reducer;
