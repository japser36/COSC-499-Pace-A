import { Grid, Typography, Button } from '@material-ui/core'
import Link from 'next/link'

const MentorTabs = ({ id }) => {
  const navlink = {
    mentees: `/app/mentor/${id}/mentees`,
    pendingmatches: `/app/mentor/${id}/pending`,
  }
  return (
    <>
      <Grid item xs>
        <Link href={navlink.mentees} passHref>
          <Button color="inherit">
            <Typography variant="h6">Mentees</Typography>
          </Button>
        </Link>
      </Grid>
      <Grid item xs>
        <Link href={navlink.pendingmatches} passHref>
          <Button color="inherit">
            <Typography variant="h6">Pending Matches</Typography>
          </Button>
        </Link>
      </Grid>
    </>
  )
}

export default MentorTabs
