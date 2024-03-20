import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from 'store/apiClient';
import { loadStatus } from 'store/loadStatus';

export const createLesson = createAsyncThunk(
  'createLesson/createLesson',
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
  createdLesson: null,

  title: '',
  descr: '',

  types: [
    { value: 'read', label: 'Читалка' },
    { value: 'test', label: 'Тест' },
    { value: 'resourse', label: 'Ресурсы' },
  ],
  selectedType: { value: 'read', label: 'Читалка' },

  lessonPreview: null,
  resourses: [],

  testQuestions: [],
  newQues: {
    title: '',
    questions: [
      {
        id: 1,
        value: '',
      },
      {
        id: 2,
        value: '',
      },
      {
        id: 3,
        value: '',
      },
      {
        id: 4,
        value: '',
      },
      {
        id: 5,
        value: '',
      },
    ],
  },
  toNewQues: false,
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

    setLessonPreview: (state, action) => {
      state.lessonPreview = action.payload;
    },

    setResourses: (state, action) => {
      const newFile = action.payload;

      if (state.resourses.find((item) => item.name === newFile.name)) {
        return;
      }

      state.resourses.push(newFile);
    },

    delFile: (state, action) => {
      const delFile = action.payload;

      state.resourses = state.resourses.filter(
        (item) => item.name !== delFile.name,
      );
    },

    setToNewQues: (state, action) => {
      state.toNewQues = action.payload;
    },

    setNewQuesTitle: (state, action) => {
      state.newQues.title = action.payload;
    },

    clearNewQues: (state) => {
      state.newQues = {
        title: '',
        questions: [
          {
            id: 1,
            value: '',
          },
          {
            id: 2,
            value: '',
          },
          {
            id: 3,
            value: '',
          },
          {
            id: 4,
            value: '',
          },
          {
            id: 5,
            value: '',
          },
        ],
      };
    },

    setNewQuesQues: (state, action) => {
      const curQues = action.payload;
      state.newQues.questions = state.newQues.questions.map((ques) =>
        ques.id === curQues.id ? curQues : ques,
      );
    },

    addNewQues: (state, action) => {
      const newQues = action.payload;

      state.testQuestions.push(newQues);
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

export const {
  setTitle,
  setDescr,
  setSelectedType,
  setLessonPreview,
  setResourses,
  delFile,
  setToNewQues,
  setNewQuesTitle,
  setNewQuesQues,
  clearNewQues,
  addNewQues,
} = createLessonSlice.actions;
export const createLessonSel = (state) => state.createLesson;

export default createLessonSlice.reducer;
