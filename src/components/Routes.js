import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/home" />
    </Route>
    <Route path="/settings">
      <Redirect to="/login" />
    </Route>
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
)

export default Routes
