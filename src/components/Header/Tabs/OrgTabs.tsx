import { Grid, Typography, Button } from '@material-ui/core'
import Link from 'next/link'

const OrgTabs = () => {
  return (
    <>
      <Grid item xs>
        <Link href='/app/org/mentees' passHref>
          <Button color="inherit">
            <Typography variant="h6">Mentees</Typography>
          </Button>
        </Link>
      </Grid>
      <Grid item xs>
        <Link href='/app/org/mentors' passHref>
          <Button color="inherit">
            <Typography variant="h6">Mentors</Typography>
          </Button>
        </Link>
      </Grid>
    </>
  )
}

export default OrgTabs
