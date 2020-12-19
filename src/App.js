import React from 'react'
import { useSelector } from 'react-redux'
import Container from './components/Container'
import ProtectedContainer from './components/ProtectedContainer'
import ProtectedRoutes from './components/ProtectedRoutes'
import Routes from './components/Routes'

function App() {
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn)
  return isLoggedIn ? (
    <ProtectedContainer>
      <ProtectedRoutes />
    </ProtectedContainer>
  ) : (
    <Container>
      <Routes />
    </Container>
  )
}

export default App
