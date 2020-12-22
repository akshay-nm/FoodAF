import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleResponse, logger } from '../utils'
import api from '../api-adapter'

const getStartTime = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

const Todays = () => {
  const dispatch = useDispatch()

  const accessToken = useSelector((state) => state.session.accessToken)

  const [data, set] = useState(null)
  const [loading, setLoading] = useState(false)
  const [next, setNext] = useState(null)
  const [current, setCurrent] = useState(null)
  const [currentTime, setCurrentTime] = useState((Date.now() - getStartTime()) / (1000 * 60 * 60))

  const updateCurrentAndNext = (cur = null, nxt = null) => {
    setCurrent(cur)
    setNext(nxt)
  }

  useEffect(() => {
    if (currentTime > 22) updateCurrentAndNext()
    else if (currentTime > 20 && currentTime < 22) updateCurrentAndNext('dinner')
    else if (currentTime > 15 && currentTime < 20) updateCurrentAndNext(null, 'dinner')
    else if (currentTime > 13 && currentTime < 15) updateCurrentAndNext('lunch', 'dinner')
    else if (currentTime > 10 && currentTime < 13) updateCurrentAndNext(null, 'lunch')
    else if (currentTime > 8 && currentTime < 10) updateCurrentAndNext('breakfast', 'lunch')
    else updateCurrentAndNext('breakfast', null)
  }, [currentTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const getData = useCallback(() => {
    setLoading(true)
    api()
      .dishes.getTodays(accessToken)
      .send()
      .then(handleResponse)
      .then(set)
      .then(() => setLoading(false))
      .catch((error) => {
        logger('Error while trying to get dishes for today', error)
        setLoading(false)
        handleError(error, dispatch)
      })
  }, [accessToken, dispatch])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div className="border p-4 mb-4">
      <div className="text-xl uppercase mb-2">Today&apos;s</div>
      {loading && <div>Loading</div>}
      {!loading && data && (
        <div>
          <div>
            <div>Breakfast</div>
            {current === 'breakfast' && (
              <div className="px-2 py-1 text-green-500 border border-green-500 rounded uppercase">
                Current
              </div>
            )}
            {next === 'breakfast' && (
              <div className="px-2 py-1 text-blue-500 border border-blue-500 rounded uppercase">
                Is next
              </div>
            )}
            {current !== 'breakfast' && next !== 'breakfast' && (
              <div className="px-2 py-1 text-gray-500 border border-gray-500 rounded uppercase">
                Elapsed
              </div>
            )}
            <div>{data ? data.breakfast : 'Loading'}</div>
          </div>
          <div>
            <div className="uppercase text-2xl">Lunch</div>
            {current === 'lunch' && (
              <div className="px-2 py-1 text-green-500 border border-green-500 rounded uppercase">
                Current
              </div>
            )}
            {next === 'lunch' && (
              <div className="px-2 py-1 text-blue-500 border border-blue-500 rounded uppercase">
                Is next
              </div>
            )}
            {current !== 'lunch' && next !== 'lunch' && (
              <div className="px-2 py-1 text-gray-500 border border-gray-500 rounded uppercase">
                Elapsed
              </div>
            )}
            <div>{data ? data.lunch : 'Loading'}</div>
          </div>
          <div>
            {current === 'dinner' && (
              <div className="px-2 py-1 text-green-500 border border-green-500 rounded uppercase">
                Current
              </div>
            )}
            {next === 'dinner' && (
              <div className="px-2 py-1 text-blue-500 border border-blue-500 rounded uppercase">
                Is next
              </div>
            )}
            {current !== 'dinner' && next !== 'dinner' && (
              <div className="px-2 py-1 text-gray-500 border border-gray-500 rounded uppercase">
                Elapsed
              </div>
            )}
            <div className="uppercase text-2xl">Dinner</div>
            <div>{data ? data.dinner : 'Loading'}</div>
          </div>
        </div>
      )}
      {!loading && !data && <div>No data to show </div>}
    </div>
  )
}

export default Todays
