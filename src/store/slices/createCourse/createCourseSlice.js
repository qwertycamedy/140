import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
});

export const {
  setTitle,
  setDescr,
  setSelectedGoal,
  setSelectedGuide,
} = createCourseSlice.actions;
export const createCourseSel = (state) => state.createCourse;

export default createCourseSlice.reducer;
