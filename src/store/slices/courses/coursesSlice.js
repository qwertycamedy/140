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
    setSearchValue: (state,action) => {
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

export const { setSearchValue, setFiltersModal, setSelectedGoal, setSelectedGuide } = coursesSlice.actions;
export const coursesSel = (state) => state.courses;

export default coursesSlice.reducer;
