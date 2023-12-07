import { configureStore } from '@reduxjs/toolkit'

import window from './slices/window/windowSlice'
import header from './slices/header/headerSlice'
import lang from './slices/lang/langSlice'
import courses from './slices/courses/coursesSlice'


export const store = configureStore({
  reducer: {
    window,
    lang,
    header,

    courses,
  },
})
