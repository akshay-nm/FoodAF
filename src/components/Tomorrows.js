import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleResponse, logger } from '../utils'
import api from '../api-adapter'

const Tomorrows = () => {
  const dispatch = useDispatch()

  const accessToken = useSelector((state) => state.session.accessToken)

  const [data, set] = useState(null)
  const [loading, setLoading] = useState(false)

  const getData = useCallback(() => {
    setLoading(true)
    api()
      .dishes.getTomorrows(accessToken)
      .send()
      .then(handleResponse)
      .then(set)
      .then(() => setLoading(true))
      .catch((error) => {
        logger('Error while trying to get dishes for tomorrow')
        setLoading(false)
        handleError(error, dispatch)
      })
  }, [accessToken, dispatch])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div className="border relative rounded p-4 mb-4 bg-white">
      <div className="text-xl uppercase mb-2">Tomorrow&apos;s</div>
      <div>
        <div>
          <div>Breakfast</div>
          <div>{loading && 'loading'}</div>
          <div>{!loading && data ? data.breakfast : 'no data to show'}</div>
        </div>
        <div>
          <div>Lunch</div>
          <div>{loading && 'loading'}</div>
          <div>{!loading && data ? data.lunch : 'no data to show'}</div>
        </div>
        <div>
          <div>Dinner</div>
          <div>{loading && 'loading'}</div>
          <div>{!loading && data ? data.dinner : 'no data to show'}</div>
        </div>
      </div>
    </div>
  )
}

export default Tomorrows
