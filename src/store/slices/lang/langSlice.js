import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  langs: [
    { value: 'kz', label: 'KZ' },
    { value: 'ru', label: 'RU' },
    { value: 'en', label: 'EN' },
  ],
  selectedLang: { value: 'kz', label: 'KZ' },
};

const langsSlice = createSlice({
  name: 'langs',
  initialState,
  reducers: {
    setSelectedLang: (state, action) => {
      state.selectedLang = action.payload;
    },
  },
});

export const { setSelectedLang } = langsSlice.actions;
export const langsSel = (state) => state.lang;

export default langsSlice.reducer;
