import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  isAdmin: false,

  toIn: true,
  toUp: false,
  toAdmin: false,

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
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },

    setToIn: (state) => {
      state.toIn = true;
      state.toUp = false;
      state.toAdmin = false;
    },
    setToUp: (state) => {
      state.toUp = true;
      state.toIn = false;
      state.toAdmin = false;
    },
    setToAdmin: (state) => {
      state.toAdmin = true;
      state.toUp = false;
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

    clearFields: (state) => {
      state.name = "";
      state.email = "";
      state.pass = "";
      state.confirmPass = "";
    }
  },
});

export const {
  setIsAuth,
  setIsAdmin,
  setToIn,
  setToUp,
  setToAdmin,
  setName,
  setEmail,
  setPass,
  setConfirmPass,
  clearFields,
} = authSlice.actions;
export const authSel = (state) => state.auth;

export default authSlice.reducer;
