import { logger } from '../utils'

const customFetch = (parameters = {}) => {
  logger('CUSTOM FETCH:: PARAMETERS RECEIVED: ', parameters)
  // filter parameters
  const {
    method,
    headers,
    body,
    mode,
    credentials,
    cache,
    redirect,
    referrer,
    integrity,
    ...otherOptions
  } = parameters
  const { url, timeoutDuration, ...unsupportedOptions } = otherOptions

  // mention unsupported parameters
  if (Object.keys(unsupportedOptions).length > 0)
    logger('Ignoring unsupported options: ', unsupportedOptions)

  const fetchOptions = {
    method,
    headers,
    body,
    mode,
    credentials,
    cache,
    redirect,
    referrer,
    integrity,
  }

  logger('CUSTOM FETCH:: FETCH OPTIONS: ', fetchOptions)
  const requestController = {}

  // create an abort controller and add it to fetch options
  requestController.controller = new window.AbortController()
  fetchOptions.signal = requestController.controller.signal

  // create a request object
  requestController.request = new window.Request(url, fetchOptions)

  // expose an abort function
  requestController.timeout = null
  requestController.abort = () =>
    new Promise((resolve) => {
      if (requestController.timeout) clearTimeout(requestController.timeout)
      if (!requestController.controller.signal.aborted) requestController.controller.abort()
      resolve(requestController.controller.signal.aborted)
    })

  // expose a send function
  requestController.send = () => {
    requestController.timeout = setTimeout(() => {
      requestController.controller.abort()
    }, timeoutDuration)
    return window.fetch(requestController.request)
  }

  return requestController
}

export default customFetch
