import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateServerUnreachable } from '../app/miscSlice'
import AlertMessage from './AlertMessage'

const ServerIsUnreachable = () => {
  const serverUnreachable = useSelector((state) => state.misc.serverUnreachable)

  const dispatch = useDispatch()
  useEffect(() => {
    if (serverUnreachable) {
      const timeout = setTimeout(() => dispatch(updateServerUnreachable(false)), 3000)
      return () => clearTimeout(timeout)
    }
    return null
  })
  return <AlertMessage>Please check your internet connection...</AlertMessage>
}

export default ServerIsUnreachable
