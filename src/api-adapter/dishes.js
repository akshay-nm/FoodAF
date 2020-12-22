import { configuredFetch, getUrlFromPath } from './helpers'

const resourceType = 'dishes'

const create = (accessToken, payload) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}`),
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

const getAll = (accessToken) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}`),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

const getYesterdays = (accessToken) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/yesterdays`),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

const getTodays = (accessToken) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/todays`),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

const getTomorrows = (accessToken) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/tomorrows`),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

const getDayAfters = (accessToken) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/day-afters`),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

const get = (accessToken, resourceId) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/${resourceId}`),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

const update = (accessToken, resourceId, payload) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/${resourceId}`),
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

const terminate = (accessToken, resourceId) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/${resourceId}`),
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

const search = (accessToken, payload) =>
  configuredFetch({
    url: getUrlFromPath(`${resourceType}?${new URLSearchParams(payload).toString()}`),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

export default {
  create,
  getAll,
  get,
  update,
  terminate,
  search,
  getYesterdays,
  getTodays,
  getTomorrows,
  getDayAfters,
}
