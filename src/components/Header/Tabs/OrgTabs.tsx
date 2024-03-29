import { Grid, Typography, Button } from '@material-ui/core'
import Link from 'next/link'

const OrgTabs = () => {
  return (
    <>
      <Grid container item justify="space-evenly" xs>
        <Link href="/app/org/mentees" passHref>
          <Button color="inherit">
            <Typography variant="h6">Mentees</Typography>
          </Button>
        </Link>
      </Grid>
      <Grid container item justify="space-evenly" xs>
        <Link href="/app/org/mentors" passHref>
          <Button color="inherit">
            <Typography variant="h6">Mentors</Typography>
          </Button>
        </Link>
      </Grid>
    </>
  )
}

export default OrgTabs
