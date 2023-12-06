import { configureStore } from '@reduxjs/toolkit'

import window from './slices/window/windowSlice'
import header from './slices/header/headerSlice'
import lang from './slices/lang/langSlice'


export const store = configureStore({
  reducer: {
    window,
    header,
    lang
  },
})
