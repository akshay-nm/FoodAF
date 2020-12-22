import { configuredFetch, getUrlFromPath } from './helpers'

const resourceType = 'sessions'

const create = (payload) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}`),
    method: 'POST',
    body: JSON.stringify(payload),
  })

/*
const getAll = () =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}`),
    method: 'GET',
  })

const get = (resourceId) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/${resourceId}`),
    method: 'GET',
  })

const update = (resourceId, payload) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/${resourceId}`),
    method: 'PUT',
    body: JSON.stringify(payload),
  })

const terminate = (resourceId) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/${resourceId}`),
    method: 'DELETE',
  })

const search = (payload) =>
  configuredFetch({
    url: getUrlFromPath(`${resourceType}?${new URLSearchParams(payload).toString()}`),
    method: 'GET',
  })
*/

const refresh = (user, refreshToken) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/refresh`),
    method: 'POST',
    body: JSON.stringify({ user, refreshToken }),
  })

const revokeById = (user, refreshTokenId) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/revoke`),
    method: 'POST',
    body: JSON.stringify({ user, refreshTokenId }),
  })

const revoke = (user, refreshToken) =>
  configuredFetch({
    url: getUrlFromPath(`/${resourceType}/revoke`),
    method: 'POST',
    body: JSON.stringify({ user, refreshToken }),
  })

export default { create, /* getAll, get, update, terminate, search */ refresh, revoke, revokeById }
