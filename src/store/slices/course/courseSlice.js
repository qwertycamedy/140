import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from 'store/apiClient';
import { loadStatus } from 'store/loadStatus';

export const getCourseById = createAsyncThunk(
  'course/getCourseById',
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(`/courses/${courseId}`);

      return data;
    } catch (err) {
      console.log('ошибка при получении курса: ', err);
      return rejectWithValue(err.message);
    }
  },
);

export const addCourseToProfile = createAsyncThunk(
  'course/addCourseToProfile',
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post(`/users/courses/`, {
        course_id: courseId,
      });

      return data;
    } catch (err) {
      console.log('ошибка при создании курсов: ', err);
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  courseLoadStatus: 'idle',
  addCourseLoadStatus: 'idle',

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
    builder
      .addCase(addCourseToProfile.pending, (state) => {
        state.addCourseLoadStatus = loadStatus.pending;
      })
      .addCase(addCourseToProfile.fulfilled, (state) => {
        state.addCourseLoadStatus = loadStatus.fulfilled;
      })
      .addCase(addCourseToProfile.rejected, (state) => {
        state.addCourseLoadStatus = loadStatus.rejected;
      });
  },
});

export const { clearCourse } = courseSlice.actions;
export const courseSel = (state) => state.course;

export default courseSlice.reducer;
