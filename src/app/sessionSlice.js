import jwtDecode from 'jwt-decode'

import { createSlice } from '@reduxjs/toolkit'
import { updateUserId } from './userSlice'

const initialState = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    updateRefreshToken: (state, action) => {
      state.refreshToken = action.payload
    },
    updateIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { updateAccessToken, updateRefreshToken, updateIsLoggedIn } = sessionSlice.actions

export const login = ({ accessToken, refreshToken }, callback = () => {}) => (dispatch) => {
  dispatch(updateAccessToken(accessToken))
  dispatch(updateRefreshToken(refreshToken))
  dispatch(updateUserId(jwtDecode(accessToken).id))
  dispatch(updateIsLoggedIn(true))
  callback()
}

export const logout = (callback = () => {}) => (dispatch) => {
  dispatch(updateRefreshToken(null))
  dispatch(updateAccessToken(null))
  dispatch(updateUserId(null))
  dispatch(updateIsLoggedIn(false))
  callback()
}

export const refreshSession = ({ accessToken, refreshToken }, callback = () => {}) => (
  dispatch
) => {
  dispatch(updateAccessToken(accessToken))
  dispatch(updateRefreshToken(refreshToken))
  callback()
}

export default sessionSlice.reducer
