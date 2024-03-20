import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from 'store/apiClient';
import { loadStatus } from 'store/loadStatus';

export const getLesson = createAsyncThunk(
  'lesson/getLesson',
  async ({ courseId, lessonId }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(
        `/courses/${courseId}/lessons/${lessonId}`,
      );

      return data;
    } catch (err) {
      console.log('ошибка при создании урока: ', err);
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  lessonLoadStatus: 'idle',
  lesson: null,
};

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLesson.pending, (state) => {
        state.lessonLoadStatus = loadStatus.pending;
      })
      .addCase(getLesson.fulfilled, (state, action) => {
        state.lessonLoadStatus = loadStatus.fulfilled;
        state.lesson = action.payload.data;
      })
      .addCase(getLesson.rejected, (state) => {
        state.lessonLoadStatus = loadStatus.rejected;
        state.lesson = null;
      });
  },
});

export const {
  setCurrentUserCourse,
  setCurrentAdminCourse,
  setSearchValue,
  setFiltersModal,
  setCurCategory,
} = lessonSlice.actions;
export const lessonSel = (state) => state.lesson;

export default lessonSlice.reducer;
