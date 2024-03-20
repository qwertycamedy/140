import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from 'store/apiClient';
import { loadStatus } from 'store/loadStatus';

export const register = createAsyncThunk(
  'courses/register',
  async (bodyParams, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post(`/users/register`, bodyParams);

      return data;
    } catch (err) {
      console.log('ошибка при создании курса: ', err);
      return rejectWithValue(err.message);
    }
  },
);

export const login = createAsyncThunk(
  'courses/login',
  async (bodyParams, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post(`/users/login`, bodyParams);

      return data;
    } catch (err) {
      console.log('ошибка при создании курса: ', err);
      return rejectWithValue(err.message);
    }
  },
);

export const getProfile = createAsyncThunk(
  'courses/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(`/users/profile`);

      return data;
    } catch (err) {
      console.log('ошибка при создании курса: ', err);
      return rejectWithValue(err.message);
    }
  },
);

export const logout = createAsyncThunk(
  'courses/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(`/users/logout`);

      return data;
    } catch (err) {
      console.log('ошибка при создании курса: ', err);
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  getProfileLoadStatus: 'idle',
  authLoadStatus: 'idle',

  isAuth: false,
  isAdmin: false,

  toIn: true,
  toUp: false,
  toAdmin: false,

  name: '',
  email: '',
  pass: '',
  confirmPass: '',

  user: null,
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
      state.name = '';
      state.email = '';
      state.pass = '';
      state.confirmPass = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.authLoadStatus = loadStatus.pending;
      })
      .addCase(register.fulfilled, (state) => {
        state.authLoadStatus = loadStatus.fulfilled;
      })
      .addCase(register.rejected, (state) => {
        state.authLoadStatus = loadStatus.rejected;
      });
    builder
      .addCase(login.pending, (state) => {
        state.authLoadStatus = loadStatus.pending;
      })
      .addCase(login.fulfilled, (state) => {
        state.authLoadStatus = loadStatus.fulfilled;
      })
      .addCase(login.rejected, (state) => {
        state.authLoadStatus = loadStatus.rejected;
      });
    builder
      .addCase(getProfile.pending, (state) => {
        state.getProfileLoadStatus = loadStatus.pending;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.getProfileLoadStatus = loadStatus.fulfilled;
        state.name = '';
        state.pass = '';
        state.email = '';
        state.confirmPass = '';
        state.isAuth = true;
        state.user = action.payload.data;

        localStorage.setItem('is_auth', JSON.stringify(true));
      })
      .addCase(getProfile.rejected, (state) => {
        state.getProfileLoadStatus = loadStatus.rejected;
        state.name = '';
        state.pass = '';
        state.email = '';
        state.isAuth = false;
        state.confirmPass = '';

        localStorage.removeItem('is_auth');
      });
    builder
      .addCase(logout.pending, (state) => {
        state.authLoadStatus = loadStatus.pending;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authLoadStatus = loadStatus.fulfilled;
        state.name = '';
        state.pass = '';
        state.email = '';
        state.confirmPass = '';
        state.isAuth = false;
        state.user = null;

        localStorage.removeItem('is_auth');
      })
      .addCase(logout.rejected, (state) => {
        state.authLoadStatus = loadStatus.rejected;
        state.name = '';
        state.pass = '';
        state.email = '';
        state.confirmPass = '';
      });
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
