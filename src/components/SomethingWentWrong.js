import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateInternalServerError } from '../app/miscSlice'
import AlertMessage from './AlertMessage'

const SomethingWentWrong = () => {
  const internalServerError = useSelector((state) => state.misc.internalServerError)

  const dispatch = useDispatch()
  useEffect(() => {
    if (internalServerError) {
      const timeout = setTimeout(() => dispatch(updateInternalServerError(false)), 3000)
      return () => clearTimeout(timeout)
    }
    return null
  })
  return <AlertMessage>Opps! Something went wrong...</AlertMessage>
}

export default SomethingWentWrong
