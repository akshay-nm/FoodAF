import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import sessionReducer from './sessionSlice'
import miscReducer from './miscSlice'
import userReducer from './userSlice'

const storeParams = {
  reducer: {
    session: sessionReducer,
    misc: miscReducer,
    user: userReducer,
  },
}
if (process.env.NODE_ENV !== 'production')
  storeParams.middleware = [...getDefaultMiddleware(), logger]

export default configureStore(storeParams)
