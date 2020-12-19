import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import api from '../api-adapter'
import { handleResponse, handleError, logger } from '../utils'
import { login } from '../app/sessionSlice'
import AlertMessage from './AlertMessage'

const Register = () => {
  const dispatch = useDispatch()

  const [firstname, setFirstname] = useState({
    value: '',
    isValid: false,
    needsValidation: false,
    isUntouched: true,
  })
  const [lastname, setLastname] = useState({
    value: '',
    isValid: false,
    needsValidation: false,
    isUntouched: true,
  })
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

  const onChange = (value) => (prev) => ({
    ...prev,
    value,
    needsValidation: true,
    isUntouched: false,
  })

  const onFirstnameChange = (value) => setFirstname(onChange(value))
  const onLastnameChange = (value) => setLastname(onChange(value))
  const onEmailChange = (value) => setEmail(onChange(value))
  const onPasswordChange = (value) => setPassword(onChange(value))

  useEffect(() => {
    if (firstname.needsValidation)
      setFirstname((prev) => ({
        ...prev,
        isValid: prev.value.length > 0,
        needsValidation: false,
      }))
  }, [firstname])

  useEffect(() => {
    if (lastname.needsValidation)
      setLastname((prev) => ({
        ...prev,
        isValid: prev.value.length > 0,
        needsValidation: false,
      }))
  }, [lastname])

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
      firstname.isValid &&
        !firstname.needsValidation &&
        lastname.isValid &&
        !lastname.needsValidation &&
        email.isValid &&
        !email.needsValidation &&
        password.isValid &&
        !password.needsValidation
    )
    setShowError(false)
  }, [firstname, lastname, email, password])

  useEffect(() => {
    if (formSubmitted) {
      if (isFormValid) {
        api()
          .users.createNew({
            name: `${firstname.value} ${lastname.value}`,
            email: email.value,
            password: password.value,
          })
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
  }, [formSubmitted, isFormValid, firstname, lastname, email, password, dispatch])

  useEffect(() => {
    if (showError) {
      const timeout = setTimeout(() => setShowError(false), 3000)
      return () => clearTimeout(timeout)
    }
    return null
  }, [showError])

  return (
    <div className="p-4">
      <div>Sign up</div>
      <div className="mb-2">
        <div className="flex">
          <div className="mr-2">
            <div>First name</div>
            <input
              type="text"
              className="px-2 py-1 border"
              onChange={(event) => onFirstnameChange(event.target.value)}
              value={firstname.value}
            />
          </div>
          <div>
            <div>Last name</div>
            <input
              type="text"
              className="px-2 py-1 border"
              onChange={(event) => onLastnameChange(event.target.value)}
              value={lastname.value}
            />
          </div>
        </div>
        <div className="mb-2">
          <div>
            <div>Email</div>
            <input
              type="text"
              className="px-2 py-1 border"
              onChange={(event) => onEmailChange(event.target.value)}
              value={email.value}
            />
          </div>
        </div>
        <div className="mb-2">
          <div>
            <div>Password</div>
            <input
              type="password"
              className="px-2 py-1 border"
              onChange={(event) => onPasswordChange(event.target.value)}
              value={password.value}
            />
          </div>
        </div>
      </div>
      <div className="mb-2">
        <button
          type="button"
          className="px-2 py-1 border rounded"
          onClick={() => setFormSubmitted(true)}
        >
          Sign Up
        </button>
      </div>
      <div className="mb-2">
        <div>
          <Link to="/Login" variant="body2">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
      <AlertMessage open={showError} severity="error">
        Please crosscheck the values in the form
      </AlertMessage>
    </div>
  )
}

export default Register
