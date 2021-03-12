import { AppBar, Toolbar, Grid, IconButton, Typography, Button } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import ProfileButton from './ProfileButton'
import Tabs from './Tabs/Tabs'
import Link from 'next/link'
import { useUser } from '../../lib/auth/useUser'

const navlink = {
  home: '/',
  profile: '/profile',
  login: '/app/login',
}

const Header = () => {
  const { user, userType, logout } = useUser()

  return (
    <AppBar position="static">
      <Toolbar>
          <Grid container alignItems='center' justify='space-between' >
              <Grid container item alignItems='center' xs>
              <Grid item >
        <Link href={navlink.home} passHref>
          <IconButton edge="start" color='inherit'>
            <Home />
          </IconButton>
        </Link>
        </Grid>
        <Grid item >
        <Typography variant="h6">Mentor.io</Typography>
        </Grid>
        </Grid>
        <Tabs userType={userType} />
        <Grid item xs >
          {user ? (
            <ProfileButton logout={logout}/>
          ) : (
            <Link href={navlink.login} passHref>
              <Button color='inherit'>
              <Typography variant="h6">Login</Typography>
              </Button>
            </Link>
          )}
        </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
