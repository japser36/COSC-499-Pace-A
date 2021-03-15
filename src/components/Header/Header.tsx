import { AppBar, Toolbar, Grid, IconButton, Typography, Button } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import ProfileButton from './ProfileButton'
import Tabs from './Tabs/Tabs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { firebaseClient } from '../../lib/auth/firebaseClient'

const navlink = {
  home: '/',
  profile: '/profile',
  login: '/app/login',
}

const Header = ({ auth, usertype }) => {

  const router = useRouter()
  const logout = () => {
    return firebaseClient.auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log('Signed out successfully.')
        router.push('/')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid container item alignItems="center" xs>
            <Grid item>
              <Link href={navlink.home} passHref>
                <IconButton edge="start" color="inherit">
                  <Home />
                </IconButton>
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="h6">Mentor.io</Typography>
            </Grid>
          </Grid>
          {auth ? <Tabs userType={usertype} /> : <></>}
          <Grid item xs>
            {auth ? (
              <ProfileButton logout={logout} />
            ) : (
              <Link href={navlink.login} passHref>
                <Button color="inherit">
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
