import { Grid, Typography, Button } from '@material-ui/core'
import Link from 'next/link'

const navlink = {
  mentees: '/app/mentor/mentees',
  pendingmatches: '/app/mentor/pending',
}

const MentorTabs = () => {
  return (
    <>
      <Grid item xs >
      <Link href={navlink.mentees} passHref>
              <Button color='inherit'>
              <Typography variant="h6">Mentees</Typography>
              </Button>
            </Link>
      </Grid>
      <Grid item xs >
      <Link href={navlink.pendingmatches} passHref>
              <Button color='inherit'>
              <Typography variant="h6">Pending Matches</Typography>
              </Button>
            </Link>
      </Grid>
    </>
  )
}

export default MentorTabs