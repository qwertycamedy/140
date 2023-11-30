import { configureStore } from '@reduxjs/toolkit'

import window from './slices/window/windowSlice'
import header from './slices/header/headerSlice'


export const store = configureStore({
  reducer: {
    window,
    header,
  },
})
