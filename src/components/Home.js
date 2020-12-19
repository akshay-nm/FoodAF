import React from 'react'

const Home = () => (
  <div>
    Home component.
    <br />
    Add content about&nbsp;
    {process.env.REACT_APP_NAME}
    .
    <br />
    Navigation is already present on the top so no need to keep it in this component.
  </div>
)

export default Home
