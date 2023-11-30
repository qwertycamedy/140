import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  windowWidth: window.innerWidth,
};

const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
  },
});

export const { setWindowWidth } = windowSlice.actions;
export const windowSel = (state) => state.window;

export default windowSlice.reducer;
