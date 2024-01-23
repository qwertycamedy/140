import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [
    {
      id: 1,
      category: 'Имеется база',
      title: 'Самая вышка!',
      descr: 'Вам нужно набрать как можно больше баллов не смотря ни на что!',
      style: {
        background: '#F6F6DC',
        color: 'dark',
      },
    },
    {
      id: 2,
      category: 'С нуля',
      title: 'Бокал на половину полон :D',
      descr:
        '50 баллов меня устроят. Один хрен кричать “Свободная касса!” через четыре года, разве не так?!',
      style: {
        background: '#DCEAF6',
        color: 'dark',
      },
    },
    {
      id: 3,
      category: 'С нуля',
      title: 'Грантик со скрипом',
      descr:
        'И родаков не напрягаю, и сам за все раскидываю, но жизнь чет пахнет хуем. (но это не важнооооо..)',
      style: {
        background: '#F6DCDC',
        color: 'dark',
      },
    },
  ],

  myCourses: [
    {
      id: 1,
      category: 'Имеется база',
      title: 'Самая вышка!',
      descr: 'Вам нужно набрать как можно больше баллов не смотря ни на что!',
      lessons: [
        {
          id: 1,
          label: 'Где я и куда идти?',
          path: '1',
          isPassed: true,
        },
        {
          id: 2,
          label: 'Ориентиры для выпускника с большими планами и мечтами',
          path: '2',
          isPassed: false,
        },
        {
          id: 3,
          label: 'Становится потненько..',
          path: '3',
          isPassed: false,
        },
        {
          id: 4,
          label: 'Меня уже никто не остановит!',
          path: '4',
          isPassed: false,
        },
      ],
      hoursCount: 32,
      style: {
        background: '#F6F6DC',
        color: 'dark',
      },
    },
    {
      id: 2,
      category: 'Имеется база',
      title: 'Грантик со скрипом',
      descr: 'Вам нужно набрать как можно больше баллов не смотря ни на что!',
      lessons: [
        {
          id: 1,
          label: 'Где я и куда идти?',
          path: '1',
          isPassed: true,
        },
        {
          id: 2,
          label: 'Ориентиры для выпускника с большими планами и мечтами',
          path: '2',
          isPassed: false,
        },
        {
          id: 3,
          label: 'Становится потненько..',
          path: '3',
          isPassed: false,
        },
        {
          id: 4,
          label: 'Меня уже никто не остановит!',
          path: '4',
          isPassed: false,
        },
      ],
      hoursCount: 32,
      style: {
        background: '#F6DCDC',
        color: 'dark',
      },
    },
  ],
  currentMyCourse: null,

  searchValue: '',

  filtersModal: false,

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

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCurrentMyCourse: (state, action) => {
      state.currentMyCourse = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setFiltersModal: (state, action) => {
      state.filtersModal = action.payload;
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
  setCurrentMyCourse,
  setSearchValue,
  setFiltersModal,
  setSelectedGoal,
  setSelectedGuide,
} = coursesSlice.actions;
export const coursesSel = (state) => state.courses;

export default coursesSlice.reducer;
