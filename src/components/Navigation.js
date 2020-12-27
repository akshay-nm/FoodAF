import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../app/sessionSlice'

const Navigation = () => {
  const history = useHistory()
  const session = useSelector((state) => state.session.accessToken)

  const dispatch = useDispatch()

  const onLogoutClick = () => dispatch(logout())
  const onLoginClick = () => history.push('/login')
  const onRegisterClick = () => history.push('/register')

  return (
    <div className="p-4 w-100 flex items-center">
      <div className="flex-grow">{process.env.REACT_APP_NAME}</div>
      {session ? (
        <div>
          <button type="button" className="buttonx" onClick={onLogoutClick}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button type="button" className="buttonx mr-2" onClick={onLoginClick}>
            Login
          </button>
          <button type="button" className="buttonx" onClick={onRegisterClick}>
            Register
          </button>
        </div>
      )}
    </div>
  )
}

export default Navigation
