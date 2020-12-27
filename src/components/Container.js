/* eslint-disable max-len */
import React from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'

export default function Container({ children }) {
  const history = useHistory()
  const location = useLocation()

  const onLoginClick = () => {
    if (location.pathname !== '/login') history.push('/login')
    else history.replace('/login')
  }
  const onRegisterClick = () => {
    if (location.pathname !== '/register') history.push('/register')
    else history.replace('/register')
  }
  const onHomeClick = () => {
    if (location.pathname !== '/') history.push('/')
    else history.replace('/')
  }
  return (
    <div className="w-full h-full relative bg-gray-900 text-white flex flex-col">
      <div className="relative flex w-full p-4 bg-gray-800">
        <div className="flex-grow">
          <button type="button" className="px-2 py-1" onClick={onHomeClick}>
            {process.env.REACT_APP_NAME}
          </button>
        </div>
        <div className="flex items-center">
          <button type="button" className="buttonx mr-2" onClick={onRegisterClick}>
            Register
          </button>
          <button type="button" className="buttonx" onClick={onLoginClick}>
            Login
          </button>
        </div>
      </div>
      <main className="flex-grow relative">{children}</main>
    </div>
  )
}
Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}
