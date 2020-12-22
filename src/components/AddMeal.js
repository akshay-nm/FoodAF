import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleResponse, logger } from '../utils'
import api from '../api-adapter'

const AddMeal = () => {
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

  const [isForBreakfast, setIsForBreakfast] = useState(false)
  const toggleIsForBreakfast = () => setIsForBreakfast((prev) => !prev)

  const [isForLunch, setIsForLunch] = useState(false)
  const toggleIsForLunch = () => setIsForLunch((prev) => !prev)

  const [isForDinner, setIsForDinner] = useState(false)
  const toggleIsForDinner = () => setIsForDinner((prev) => !prev)

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
    <div className="p-4 border mb-4">
      <div className="text-xl uppercase mb-2">Add a Meal</div>
      <div className="mb-2">
        <div>Name</div>
        <input
          className="px-2 py-1 border"
          value={name.value}
          onChange={(event) => onNameChange(event.target.value)}
        />
      </div>
      <div className="mb-2">
        <div>For</div>
        <div className="flex">
          <div className="mb-2 mr-2">
            {isForBreakfast && (
              <button
                type="button"
                className="px-2 py-1 border rounded text-blue-400 border-blue-400"
                onClick={toggleIsForBreakfast}
              >
                Breakfast
              </button>
            )}
            {!isForBreakfast && (
              <button
                type="button"
                className="px-2 py-1 border rounded"
                onClick={toggleIsForBreakfast}
              >
                Breakfast
              </button>
            )}
          </div>
          <div className="mb-2 mr-2">
            {isForLunch && (
              <button
                type="button"
                className="px-2 py-1 border rounded text-blue-400 border-blue-400"
                onClick={toggleIsForLunch}
              >
                Lunch
              </button>
            )}
            {!isForLunch && (
              <button type="button" className="px-2 py-1 border rounded" onClick={toggleIsForLunch}>
                Lunch
              </button>
            )}
          </div>
          <div className="mb-2 mr-2">
            {isForDinner && (
              <button
                type="button"
                className="px-2 py-1 border rounded text-blue-400 border-blue-400"
                onClick={toggleIsForDinner}
              >
                Dinner
              </button>
            )}
            {!isForDinner && (
              <button
                type="button"
                className="px-2 py-1 border rounded"
                onClick={toggleIsForDinner}
              >
                Dinner
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="px-2 py-1 border rounded"
          onClick={() => setFormWasSubmitted(true)}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default AddMeal
