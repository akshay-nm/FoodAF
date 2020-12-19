import { Link } from 'react-router-dom'
import React from 'react'

const PageNotFound = () => (
  <div>
    <div>The page you are looking for does not exist.</div>
    <div>
      <Link to="/">Go back to Home/Dashboard page</Link>
    </div>
  </div>
)

export default PageNotFound
