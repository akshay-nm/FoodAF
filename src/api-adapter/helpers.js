import customFetch from './custom-fetch'
import { logger } from '../utils'

const _ = require('lodash')

const fetchConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeoutDuration: 3000,
}

export const configuredFetch = (info) => {
  logger('CONFIGURED FETCH CALL:: DEFAULT CONFIG: ', fetchConfig)
  logger('CONFIGURED FETCH CALL:: INFO RECEIVED: ', info)
  const config = _.merge({}, fetchConfig, info)
  logger('CONFIGURED FETCH CALL:: CONFIG: ', config)
  return customFetch(config)
}

export const getUrlFromPath = (path) => `${process.env.REACT_APP_API_SERVER_URL}/api${path || ''}`
