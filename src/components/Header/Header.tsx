import { AppBar, Toolbar, Grid, IconButton, Typography, Button } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import ProfileButton from './ProfileButton'
import Tabs from './Tabs/Tabs'
import Link from 'next/link'

const Header = ({ auth, usertype }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid container item alignItems="center" xs>
            <Grid item>
              <Link href="/" passHref>
                <IconButton edge="start" color="inherit">
                  <Home />
                </IconButton>
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="h6">Mentor.io</Typography>
            </Grid>
          </Grid>
          {auth ? <Tabs usertype={usertype} /> : <></>}
          <Grid container item justify="flex-end" xs>
            {auth ? (
              <ProfileButton usertype={usertype} />
            ) : (
              <Link href="/app/login" passHref>
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
