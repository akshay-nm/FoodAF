import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  serverUnreachable: null,
  internalServerError: null,
  forbidden: null,
}

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  updateServerUnreachable: (state, action) => {
    state.serverUnreachable = action.payload
  },
  updateInternalServerError: (state, action) => {
    state.internalServerError = action.payload
  },
  updateForbidden: (state, action) => {
    state.forbidden = action.payload
  },
})

export const {
  updateServerUnreachable,
  updateInternalServerError,
  updateForbidden,
} = miscSlice.actions

export default miscSlice.reducer
