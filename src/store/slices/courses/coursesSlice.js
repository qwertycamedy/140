import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from 'store/apiClient';
import { loadStatus } from 'store/loadStatus';

export const getAllCourses = createAsyncThunk(
  'courses/getAllCourses',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(`/courses/`);

      return data;
    } catch (err) {
      console.log('ошибка при создании курса: ', err);
      return rejectWithValue(err.message);
    }
  },
);

export const getRandomCourses = createAsyncThunk(
  'courses/getRandomCourses',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(`/courses/random`);

      return data;
    } catch (err) {
      console.log('ошибка при создании курса: ', err);
      return rejectWithValue(err.message);
    }
  },
);

export const filterCourses = createAsyncThunk(
  'courses/filterCourses',
  async ({ category, searchValue }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(
        `/courses/filter?category=${category}&search=${searchValue}`,
      );

      return data;
    } catch (err) {
      console.log('ошибка при создании курса: ', err);
      return rejectWithValue(err.message);
    }
  },
);

export const getUserCourses = createAsyncThunk(
  'courses/getUserCourses',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(`/users/courses`);

      return data;
    } catch (err) {
      console.log('ошибка при создании курса: ', err);
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  coursesLoadStatus: 'idle',
  filtersLoadStatus: 'idle',
  courses: null,

  randomCoursesLoadStatus: 'idle',
  randomCourses: null,

  userCoursesLoadStatus: 'idle',
  userCourses: null,
  currentUserCourse: null,

  // adminCourses: [
  //   {
  //     id: 1,
  //     category: 'Имеется база',
  //     title: 'Самая вышка!',
  //     descr: 'Вам нужно набрать как можно больше баллов не смотря ни на что!',
  //     lessons: [
  //       {
  //         id: 1,
  //         label: 'Где я и куда идти?',
  //         path: '1',
  //         isPassed: true,
  //       },
  //       {
  //         id: 2,
  //         label: 'Ориентиры для выпускника с большими планами и мечтами',
  //         path: '2',
  //         isPassed: false,
  //       },
  //       {
  //         id: 3,
  //         label: 'Становится потненько..',
  //         path: '3',
  //         isPassed: false,
  //       },
  //       {
  //         id: 4,
  //         label: 'Меня уже никто не остановит!',
  //         path: '4',
  //         isPassed: false,
  //       },
  //     ],
  //     style: {
  //       background: '#F6F6DC',
  //       color: 'dark',
  //     },
  //   },
  //   {
  //     id: 2,
  //     category: 'Имеется база',
  //     title: 'Грантик со скрипом',
  //     descr: 'Вам нужно набрать как можно больше баллов не смотря ни на что!',
  //     lessons: [
  //       {
  //         id: 1,
  //         label: 'Где я и куда идти?',
  //         path: '1',
  //         isPassed: true,
  //       },
  //       {
  //         id: 2,
  //         label: 'Ориентиры для выпускника с большими планами и мечтами',
  //         path: '2',
  //         isPassed: false,
  //       },
  //       {
  //         id: 3,
  //         label: 'Становится потненько..',
  //         path: '3',
  //         isPassed: false,
  //       },
  //       {
  //         id: 4,
  //         label: 'Меня уже никто не остановит!',
  //         path: '4',
  //         isPassed: false,
  //       },
  //     ],
  //     style: {
  //       background: '#F6DCDC',
  //       color: 'dark',
  //     },
  //   },
  // ],
  // currentAdminCourse: null,

  searchValue: '',
  categories: [
    {
      id: 1,
      label: 'Физмат',
      value: 'fizmat',
    },
    {
      id: 2,
      label: 'Геоанг',
      value: 'geoang',
    },
    {
      id: 3,
      label: 'Геомат',
      value: 'geomat',
    },
    {
      id: 4,
      label: 'Творческие',
      value: 'art',
    },
  ],
  curCategory: null,

  filtersModal: false,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCurrentUserCourse: (state, action) => {
      state.currentUserCourse = action.payload;
    },
    setCurrentAdminCourse: (state, action) => {
      state.currentAdminCourse = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setFiltersModal: (state, action) => {
      state.filtersModal = action.payload;
    },
    setCurCategory: (state, action) => {
      if (state.curCategory?.id === action.payload?.id) {
        state.curCategory = null;
      } else {
        state.curCategory = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.coursesLoadStatus = loadStatus.pending;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.coursesLoadStatus = loadStatus.fulfilled;
        state.courses = action.payload.data;
      })
      .addCase(getAllCourses.rejected, (state) => {
        state.coursesLoadStatus = loadStatus.rejected;
        state.courses = null;
      });
    builder
      .addCase(getRandomCourses.pending, (state) => {
        state.randomCoursesLoadStatus = loadStatus.pending;
      })
      .addCase(getRandomCourses.fulfilled, (state, action) => {
        state.randomCoursesLoadStatus = loadStatus.fulfilled;
        state.randomCourses = action.payload.data;
      })
      .addCase(getRandomCourses.rejected, (state) => {
        state.randomCoursesLoadStatus = loadStatus.rejected;
        state.randomCourses = null;
      });
    builder
      .addCase(filterCourses.pending, (state) => {
        state.filtersLoadStatus = loadStatus.pending;
      })
      .addCase(filterCourses.fulfilled, (state, action) => {
        state.filtersLoadStatus = loadStatus.fulfilled;
        state.courses = action.payload.data;
      })
      .addCase(filterCourses.rejected, (state) => {
        state.filtersLoadStatus = loadStatus.rejected;
        state.courses = null;
      });
    builder
      .addCase(getUserCourses.pending, (state) => {
        state.userCoursesLoadStatus = loadStatus.pending;
      })
      .addCase(getUserCourses.fulfilled, (state, action) => {
        state.userCoursesLoadStatus = loadStatus.fulfilled;
        state.userCourses = action.payload.data;
      })
      .addCase(getUserCourses.rejected, (state) => {
        state.userCoursesLoadStatus = loadStatus.rejected;
        state.userCourses = null;
      });
  },
});

export const {
  setCurrentUserCourse,
  setCurrentAdminCourse,
  setSearchValue,
  setFiltersModal,
  setCurCategory,
} = coursesSlice.actions;
export const coursesSel = (state) => state.courses;

export default coursesSlice.reducer;
