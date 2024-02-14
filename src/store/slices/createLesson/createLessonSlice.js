import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { loadStatus } from 'store/loadStatus';

export const createLesson = createAsyncThunk(
  'createLesson/createLesson',
  async (bodyParams, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/courses`,
        bodyParams,
      );

      return data;
    } catch (err) {
      console.log('ошибка при создании курса: ', err);
      alert(`Увы, но создать курс не вышло... Обратитесь в тех. поддержку`);
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  createLoadStatus: 'idle',
  createdLesson: null,

  title: '',
  descr: '',

  types: [
    { value: 'read', label: 'Читалка' },
    { value: 'test', label: 'Тест' },
    { value: 'resourse', label: 'Ресурсы' },
  ],
  selectedType: { value: 'read', label: 'Читалка' },
};

const createLessonSlice = createSlice({
  name: 'createLesson',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescr: (state, action) => {
      state.descr = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createLesson.pending, (state) => {
        state.createLoadStatus = loadStatus.pending;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.createLoadStatus = loadStatus.fulfilled;
        state.createdLesson = action.payload;
      })
      .addCase(createLesson.rejected, (state) => {
        state.createLoadStatus = loadStatus.rejected;
      });
  },
});

export const { setTitle, setDescr, setSelectedType } =
  createLessonSlice.actions;
export const createLessonSel = (state) => state.createLesson;

export default createLessonSlice.reducer;
