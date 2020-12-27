import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../api-adapter'
import { handleError, handleResponse, logger } from '../utils'

const Dish = ({ id }) => {
  const dispatch = useDispatch()

  const accessToken = useSelector((state) => state.session.accessToken)

  const [data, set] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDish = useCallback(() => {
    setLoading(true)
    api()
      .dishes.get(accessToken, id)
      .send()
      .then(handleResponse)
      .then(set)
      .then(() => setLoading(false))
      .catch((error) => {
        logger('Error while trying to fetch a dish by id')
        setLoading(false)
        handleError(error, dispatch)
      })
  }, [accessToken, dispatch])

  useEffect(() => fetchDish(), [fetchDish])
  return (
    <div className="border border-red-700 px-2 py-1 mb-2">
      {data && <div>{data.name}</div>}
      {!data && loading && <div>Loading </div>}
      {!data && !loading && <div>Failed to load dish data, try refreshing </div>}
    </div>
  )
}

const AllDishes = () => {
  const dispatch = useDispatch()

  const accessToken = useSelector((state) => state.session.accessToken)

  const [ids, set] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAllDishIds = useCallback(() => {
    setLoading(true)
    api()
      .dishes.getAll(accessToken)
      .send()
      .then(handleResponse)
      .then(set)
      .then(() => setLoading(false))
      .catch((error) => {
        logger('Error while trying to fetch all dish ids')
        setLoading(false)
        handleError(error, dispatch)
      })
  }, [accessToken, dispatch])

  useEffect(() => fetchAllDishIds(), [fetchAllDishIds])

  return (
    <div className="p-2 rounded border border-red-500 bg-gray-700 text-white">
      {ids.length > 0 && (
        <>
          {ids.map((id) => (
            <Dish id={id} key={id} />
          ))}
        </>
      )}
      {ids.length === 0 && loading && <div>Loading</div>}
      {ids.length === 0 && !loading && <div>No Dishes found. Try adding some.</div>}
    </div>
  )
}

export default AllDishes
