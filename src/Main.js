import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Countdown from 'containers/Countdown'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Countdown} />
    </Switch>
  </main>
)

export default Main
