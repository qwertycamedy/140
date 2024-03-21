import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from 'store/apiClient';
import { loadStatus } from 'store/loadStatus';

export const getTest = createAsyncThunk(
  'lesson/getTest',
  async ({ courseId, lessonId }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(
        `/courses/${courseId}/lessons/${lessonId}/questions/`,
      );

      return data;
    } catch (err) {
      console.log('ошибка при получении теста: ', err);
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  isComplete: false,

  questionsLoadStatus: 'idle',
  questions: null,
  curQuestion: null,
  correctAnswersCount: 0,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setCurQuestion: (state, action) => {
      state.curQuestion = action.payload;
    },

    markAnswer: (state, action) => {
      const quesId = action.payload.quesId;
      const ansId = action.payload.ansId;

      state.questions = state.questions.map((ques) => {
        if (ques.ID === quesId) {
          ques.answers = ques.answers.map((ans) => {
            if (ans.ID === ansId) {
              return { ...ans, is_marked: true };
            } else {
              return { ...ans, is_marked: false };
            }
          });
        }
        return ques;
      });

      state.curQuestion.answers = state.curQuestion.answers.map((ans) => {
        if (ans.ID === ansId) {
          return { ...ans, is_marked: true };
        } else {
          return { ...ans, is_marked: false };
        }
      });
    },

    setIsComplete: (state, action) => {
      state.isComplete = action.payload;
    },

    setCorrectAnswersCount: (state, action) => {
      console.log(action);
      state.correctAnswersCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTest.pending, (state) => {
        state.questionsLoadStatus = loadStatus.pending;
      })
      .addCase(getTest.fulfilled, (state, action) => {
        state.questionsLoadStatus = loadStatus.fulfilled;
        state.questions = action.payload.data.map((question) => ({
          ...question,
          answers: question.answers.map((answer) => ({
            ...answer,
            is_marked: false,
          })),
        }));
      })
      .addCase(getTest.rejected, (state) => {
        state.questionsLoadStatus = loadStatus.rejected;
        state.questions = null;
      });
  },
});

export const {
  setCurQuestion,
  markAnswer,
  setIsComplete,
  setCorrectAnswersCount,
} = testSlice.actions;
export const testSel = (state) => state.test;

export default testSlice.reducer;
