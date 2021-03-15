import { Grid, Typography, Button } from '@material-ui/core'
import Link from 'next/link'

const OrgTabs = ({ id }) => {
  const navlink = {
    users: `/app/org/${id}/users`,
    mentorinvite: `/app/org/${id}/invitementor`,
  }
  return (
    <>
      <Grid item xs>
        <Link href={navlink.users} passHref>
          <Button color="inherit">
            <Typography variant="h6">Users</Typography>
          </Button>
        </Link>
      </Grid>
      <Grid item xs>
        <Link href={navlink.mentorinvite} passHref>
          <Button color="inherit">
            <Typography variant="h6">Invite Mentors</Typography>
          </Button>
        </Link>
      </Grid>
    </>
  )
}

export default OrgTabs
