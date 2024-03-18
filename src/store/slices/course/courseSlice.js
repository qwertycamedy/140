import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { loadStatus } from 'store/loadStatus';

export const getCourseById = createAsyncThunk(
  'courses/getCourseById',
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}`,
      );

      return data;
    } catch (err) {
      console.log('ошибка при создании курса: ', err);
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  courseLoadStatus: 'idle',
  course: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearCourse: (state) => {
      state.courseLoadStatus = 'idle';
      state.course = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseById.pending, (state) => {
        state.courseLoadStatus = loadStatus.pending;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.courseLoadStatus = loadStatus.fulfilled;
        state.course = action.payload.data;
      })
      .addCase(getCourseById.rejected, (state) => {
        state.courseLoadStatus = loadStatus.rejected;
        state.course = null;
      });
  },
});

export const { clearCourse } = courseSlice.actions;
export const courseSel = (state) => state.course;

export default courseSlice.reducer;
