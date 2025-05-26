import {configureStore} from '@reduxjs/toolkit'
import authreducer from './authslice'

export const store=configureStore({
    // reducer:authreducer
    reducer: {
    auth: authreducer,
  },
})
