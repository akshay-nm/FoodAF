import { updateInternalServerError, updateServerUnreachable } from './app/miscSlice'
import { logout, updateAccessToken } from './app/sessionSlice'

export const logger = (...args) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'preoduction') console.log(...args)
}

export const handleResponse = (res) => {
  if (res.ok) return res.json()
  throw Error(`${res.status}`)
}

export const handleError = (error, dispatch) => {
  logger(error)
  if (error.message === '404') dispatch(updateServerUnreachable(true))
  if (error.message === '500') dispatch(updateInternalServerError(true))
  if (error.message === '401') dispatch(updateAccessToken(null))
  if (error.message === '406') dispatch(logout())
}
