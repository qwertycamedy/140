import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSign: true,

  toIn: true,
  toUp: false,

  name: '',
  email: '',
  pass: '',
  confirmPass: '',

  user: {
    id: 0,
    name: "Qwerty Camedy",
    num: "+7 708 665 48 17",
    slug: 'qwerty_camedy',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsSign: (state, action) => {
      state.isSign = action.payload;
    },
    setToIn: (state) => {
      state.toIn = true;
      state.toUp = false;
    },
    setToUp: (state) => {
      state.toUp = true;
      state.toIn = false;
    },

    setName: (state, action) => {
        state.name = action.payload;
      },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPass: (state, action) => {
      state.pass = action.payload;
    },
    setConfirmPass: (state, action) => {
      state.confirmPass = action.payload;
    },
  },
});

export const {
  setToIn,
  setToUp,
  setIsSign,
  setName,
  setEmail,
  setPass,
  setConfirmPass,
} = authSlice.actions;
export const authSel = (state) => state.auth;

export default authSlice.reducer;
