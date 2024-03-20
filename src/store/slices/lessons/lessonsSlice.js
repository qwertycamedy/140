import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from 'store/apiClient';
import { loadStatus } from 'store/loadStatus';

export const getCourseLessons = createAsyncThunk(
  'lessons/getCourseLessons',
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(`/courses/${courseId}/lessons`);

      return data;
    } catch (err) {
      console.log('ошибка при создании курса: ', err);
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  lessonsLoadStatus: 'idle',
};

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLessons.pending, (state) => {
        state.lessonsLoadStatus = loadStatus.pending;
      })
      .addCase(getCourseLessons.fulfilled, (state) => {
        state.lessonsLoadStatus = loadStatus.fulfilled;
      })
      .addCase(getCourseLessons.rejected, (state) => {
        state.lessonsLoadStatus = loadStatus.rejected;
      });
  },
});

export const {
  setCurrentUserCourse,
  setCurrentAdminCourse,
  setSearchValue,
  setFiltersModal,
  setCurCategory,
} = lessonsSlice.actions;
export const lessonsSel = (state) => state.lessons;

export default lessonsSlice.reducer;
