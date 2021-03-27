import { Grid, Typography, Button } from '@material-ui/core'
import Link from 'next/link'

const MentorTabs = () => {
  return (
    <>
      <Grid item xs>
        <Link href={'/app/mentor/mymentees'} passHref>
          <Button color="inherit">
            <Typography variant="h6">My Mentees</Typography>
          </Button>
        </Link>
      </Grid>
      <Grid item xs>
        <Link href="/app/mentor/matchedmentees" passHref>
          <Button color="inherit">
            <Typography variant="h6">Matched Mentees</Typography>
          </Button>
        </Link>
      </Grid>
    </>
  )
}

export default MentorTabs
