import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from 'store/apiClient';
import { loadStatus } from 'store/loadStatus';

export const createCourse = createAsyncThunk(
  'createCourse/createCourse',
  async (bodyParams, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post(
        `/courses`,
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
  createdCourse: null,

  title: '',
  descr: '',

  goals: [
    { value: '140', label: 'Самая вышка' },
    { value: '100', label: 'На грант' },
    { value: '50', label: 'Проходной' },
  ],
  selectedGoal: { value: '140', label: 'Самая вышка' },

  guides: [
    {
      id: 1,
      label: 'Физмат',
    },
    {
      id: 2,
      label: 'Творческие',
    },
    {
      id: 3,
      label: 'Физмат',
    },
    {
      id: 4,
      label: 'Творческие',
    },
    {
      id: 5,
      label: 'Физмат',
    },
    {
      id: 6,
      label: 'Творческие',
    },
  ],
  selectedGuide: {
    id: 1,
    label: 'Физмат',
  },
};

const createCourseSlice = createSlice({
  name: 'createCourse',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescr: (state, action) => {
      state.descr = action.payload;
    },
    setSelectedGoal: (state, action) => {
      state.selectedGoal = action.payload;
    },
    setSelectedGuide: (state, action) => {
      state.selectedGuide = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.createLoadStatus = loadStatus.pending;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.createLoadStatus = loadStatus.fulfilled;
        state.createdCourse = action.payload;
      })
      .addCase(createCourse.rejected, (state) => {
        state.createLoadStatus = loadStatus.rejected;
      });
  },
});

export const { setTitle, setDescr, setSelectedGoal, setSelectedGuide } =
  createCourseSlice.actions;
export const createCourseSel = (state) => state.createCourse;

export default createCourseSlice.reducer;
