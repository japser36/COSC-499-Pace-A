// Based on https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/pages/index.js
import { useUser } from '../../lib/auth/useUser'
import Layout from '../../components/layout'
import Button from '@material-ui/core/Button'
import Navbar from '../../components/Navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import authPage from '../authPage'
import dashboard from '../dashboard'
import profile from '../profile'

export default function LoggedIn() {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/authPage"  component={authPage} />
        <Route path="/dashboard"  component={dashboard} />
        <Route path="/profile"  component={profile} />
      </Switch>
    </Router>
  )
}
