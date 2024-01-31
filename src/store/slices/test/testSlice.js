import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isComplete: true,

  questions: [
    {
      id: 1,
      question: 'Что бы вы выбрали: путешествие в горы или отдых на море?',
      answers: [
        { id: 1, label: 'Путешествие в горы', isMarked: false },
        { id: 2, label: 'Отдых на море', isMarked: false },
        { id: 3, label: 'Не знаю', isMarked: false },
        { id: 4, label: 'Люблю и то, и другое', isMarked: false },
        { id: 5, label: 'Предпочитаю домашний отдых', isMarked: false },
      ],
    },
    {
      id: 2,
      question: 'Какой ваш любимый сезон?',
      answers: [
        { id: 1, label: 'Весна', isMarked: false },
        { id: 2, label: 'Лето', isMarked: false },
        { id: 3, label: 'Осень', isMarked: false },
        { id: 4, label: 'Зима', isMarked: false },
        { id: 5, label: 'Предпочитаю пасмурные дни', isMarked: false },
      ],
    },
    {
      id: 3,
      question: 'Что для вас важнее: карьера или личная жизнь?',
      answers: [
        { id: 1, label: 'Карьера', isMarked: false },
        { id: 2, label: 'Личная жизнь', isMarked: false },
        { id: 3, label: 'Оба аспекта равнозначны', isMarked: false },
        { id: 4, label: 'Не задумывался(лась)', isMarked: false },
        { id: 5, label: 'Предпочитаю умеренный баланс', isMarked: false },
      ],
    },
    {
      id: 4,
      question: 'Какое ваше любимое блюдо?',
      answers: [
        { id: 1, label: 'Пицца', isMarked: false },
        { id: 2, label: 'Суши', isMarked: false },
        { id: 3, label: 'Стейк', isMarked: false },
        { id: 4, label: 'Паста', isMarked: false },
        { id: 5, label: 'Суп', isMarked: false },
      ],
    },
    {
      id: 5,
      question:
        'Если бы вы могли встретить любого исторического персонажа, кто бы это был?',
      answers: [
        { id: 1, label: 'Леонардо да Винчи', isMarked: false },
        { id: 2, label: 'Мартин Лютер Кинг', isMarked: false },
        { id: 3, label: 'Мэри Кюри', isMarked: false },
        { id: 4, label: 'Нельсон Мандела', isMarked: false },
        { id: 5, label: 'Другой персонаж', isMarked: false },
      ],
    },
  ],

  curQuestion: null,
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
        ques.id === quesId &&
          ques.answers.map((ans) =>
            ans.id === ansId ? (ans.isMarked = true) : ans,
          );
      });
    },
  },
});

export const { setCurQuestion, markAnswer } = testSlice.actions;
export const testSel = (state) => state.test;

export default testSlice.reducer;
