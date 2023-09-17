import { configureStore } from '@reduxjs/toolkit'
import validReducer from './validSlice.js'

export const store = configureStore({
  reducer: {
    counter: validReducer,
  },
})