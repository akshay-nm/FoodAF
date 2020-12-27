import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { logout } from '../app/sessionSlice'

export default function ProtectedContainer({ children }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const onLogoutClick = () => dispatch(logout())
  const onHomeClick = () => {
    if (location.pathname !== '/') history.push('/')
    else history.replace('/')
  }
  return (
    <div className="w-full bg-gray-800 h-full relative flex flex-col">
      <div className="flex w-full p-4">
        <div className="flex-grow">
          <button type="button" className="px-2 text-white py-1" onClick={onHomeClick}>
            {process.env.REACT_APP_NAME}
          </button>
        </div>
        <div className="flex items-center">
          <button type="button" className="buttonx" onClick={onLogoutClick}>
            Logout
          </button>
        </div>
      </div>
      <main className="flex-grow relative">{children}</main>
    </div>
  )
}
ProtectedContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}
