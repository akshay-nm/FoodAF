import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import api from '../api-adapter'
import AlertMessage from './AlertMessage'
import { handleError, handleResponse, logger } from '../utils'
import { login } from '../app/sessionSlice'

const Login = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState({
    value: '',
    isValid: false,
    needsValidation: false,
    isUntouched: true,
  })
  const [password, setPassword] = useState({
    value: '',
    isValid: false,
    needsValidation: false,
    isUntouched: true,
  })

  const [isFormValid, setIsFormValid] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showError, setShowError] = useState(false)

  const onEmailChange = (value) =>
    setEmail((prev) => ({
      ...prev,
      value,
      needsValidation: true,
      isUntouched: false,
    }))
  const onPasswordChange = (value) =>
    setPassword((prev) => ({
      ...prev,
      value,
      needsValidation: true,
      isUntouched: false,
    }))

  useEffect(() => {
    if (email.needsValidation)
      setEmail((prev) => ({
        ...prev,
        isValid: prev.value.length > 0,
        needsValidation: false,
      }))
  }, [email])

  useEffect(() => {
    if (password.needsValidation)
      setPassword((prev) => ({
        ...prev,
        isValid: prev.value.length > 0,
        needsValidation: false,
      }))
  }, [password])

  useEffect(() => {
    setIsFormValid(
      email.isValid && !email.needsValidation && password.isValid && !password.needsValidation
    )
    setShowError(false)
  }, [email, password])

  useEffect(() => {
    if (formSubmitted) {
      if (isFormValid) {
        api()
          .session.create({ email: email.value, password: password.value })
          .send()
          .then(handleResponse)
          .then((res) => dispatch(login(res)))
          .catch((error) => {
            logger('Error while trying to login')
            if (error.message === '400') setShowError(true)
            handleError(error, dispatch)
          })
      }
      setFormSubmitted(false)
    }
  }, [formSubmitted, isFormValid, email, password, dispatch])

  useEffect(() => {
    if (showError) {
      const timeout = setTimeout(() => setShowError(false), 3000)
      return () => clearTimeout(timeout)
    }
    return null
  }, [showError])

  return (
    <div>
      <div className="p-4">
        <div className="text-xl uppercase mb-2">Sign in</div>
        <div>
          <div className="mb-2">
            <div>Email</div>
            <input
              type="text"
              className="px-2 py-1 border"
              value={email.value}
              onChange={(event) => onEmailChange(event.target.value)}
            />
          </div>
          <div className="mb-2">
            <div>Password</div>
            <input
              type="password"
              className="px-2 py-1 border"
              value={password.value}
              onChange={(event) => onPasswordChange(event.target.value)}
            />
          </div>
          <div className="mb-2">
            <button
              type="button"
              className="px-2 py-1 border rounded"
              onClick={() => setFormSubmitted(true)}
            >
              Sign In
            </button>
          </div>
          <div>
            <div className="mb-2">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <div className="mb-2">
              <Link to="/register">Don&apos;t have an account? Sign Up!</Link>
            </div>
          </div>
        </div>
      </div>
      {showError && <AlertMessage>Either email or password is incorrect</AlertMessage>}
    </div>
  )
}
export default Login
