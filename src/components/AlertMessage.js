import React from 'react'
import PropTypes from 'prop-types'

const AlertMessage = ({ children }) => (
  <div className="absolute right-0 bottom-0 m-4 px-2 py-1 border">{children}</div>
)
AlertMessage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default AlertMessage
