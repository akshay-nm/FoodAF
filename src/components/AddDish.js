/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleResponse, logger } from '../utils'
import api from '../api-adapter'

const AddDish = () => {
  const dispatch = useDispatch()

  const accessToken = useSelector((state) => state.session.accessToken)

  const [name, setName] = useState({
    value: '',
    isValid: false,
    needsValidation: false,
    isUntouched: true,
  })

  const onNameChange = (value) =>
    setName((prev) => ({ ...prev, value, needsValidation: true, isUntouched: false }))

  useEffect(() => {
    if (name.needsValidation)
      setName((prev) => ({ ...prev, needsValidation: false, isValid: prev.value.length > 0 }))
  }, [name])

  const [formIsValid, setFormIsValid] = useState(false)
  const [formWasSubmitted, setFormWasSubmitted] = useState(false)

  const submit = useCallback(() => {
    api()
      .dishes.create(accessToken, {
        name: name.value,
      })
      .send()
      .then(handleResponse)
      .catch((error) => {
        logger('Error while trying to create a dish')
        handleError(error, dispatch)
      })
  }, [name])

  useEffect(() => {
    setFormIsValid(name.isValid && !name.needsValidation)
  }, [name])

  useEffect(() => {
    logger('Validity')
    logger('name: ', name.isValid)
    logger('form: ', formIsValid)
  }, [formIsValid, name])

  useEffect(() => {
    if (formWasSubmitted) {
      logger('Trying to create the dish')
      if (formIsValid) {
        logger('Sending request to create the dish')
        submit()
      }
      setFormWasSubmitted(false)
    }
  }, [formWasSubmitted, formIsValid, submit])

  return (
    <div className="p-4 rounded border border-red-600 text-white bg-gray-700 mb-4">
      <div className="text-xl text-red-600 uppercase mb-2">Add a Dish</div>
      <div className="mb-2">
        <div>Name</div>
        <input
          className="px-2 py-1 bg-gray-800 border"
          value={name.value}
          onChange={(event) => onNameChange(event.target.value)}
        />
      </div>
      <div>
        <button type="button" className="buttonx" onClick={() => setFormWasSubmitted(true)}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default AddDish
