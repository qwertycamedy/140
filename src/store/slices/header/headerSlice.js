import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  burger: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setBurger: (state, action) => {
      state.burger = action.payload;
    },
  },
});

export const { setBurger } = headerSlice.actions;
export const headerSel = state => state.header;

export default headerSlice.reducer;
