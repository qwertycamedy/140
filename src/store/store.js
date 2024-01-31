import { configureStore } from '@reduxjs/toolkit'

import window from './slices/window/windowSlice'
import lang from './slices/lang/langSlice'
import auth from './slices/auth/authSlice'
import header from './slices/header/headerSlice'
import courses from './slices/courses/coursesSlice'
import test from './slices/test/testSlice'


export const store = configureStore({
  reducer: {
    window,
    lang,
    auth,
    header,

    courses,
    test,
  },
})
