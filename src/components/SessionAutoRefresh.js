import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../api-adapter'
import { logout, refreshSession } from '../app/sessionSlice'
import { handleResponse, logger } from '../utils'
import AlertMessage from './AlertMessage'

const SessionAutoRefresh = () => {
  const accessToken = useSelector((state) => state.session.accessToken)
  const refreshToken = useSelector((state) => state.session.refreshToken)
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn)
  const user = useSelector((state) => state.user.id)

  const [showSessionExpired, setShowSessionExpired] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoggedIn && !accessToken && refreshToken) {
      api()
        .session.refresh(user, refreshToken)
        .send()
        .then(handleResponse)
        .then((res) => dispatch(refreshSession(res, () => setRefreshing(false))))
        .catch((error) => {
          logger('Error while trying to refresh session', error)
          setShowSessionExpired(true)
          dispatch(logout(() => setRefreshing(false)))
        })
    }
  }, [accessToken, isLoggedIn, refreshToken])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (showSessionExpired) {
      const timeout = setTimeout(() => setShowSessionExpired(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [showSessionExpired])

  if (refreshing) return <AlertMessage>Trying to refresh session</AlertMessage>
  if (!isLoggedIn) return <AlertMessage>Session Expired</AlertMessage>
  return ''
}

export default SessionAutoRefresh
