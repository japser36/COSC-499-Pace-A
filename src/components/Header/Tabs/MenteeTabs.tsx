import { Grid, Typography, Button } from '@material-ui/core'
import Link from 'next/link'

const MentorTabs = () => {
  const navlink = {
    mentor: '/app/mentee/mentor',
  }
  return (
    <>
      <Grid item xs>
        <Link href={navlink.mentor} passHref>
          <Button color="inherit">
            <Typography variant="h6">My Mentor</Typography>
          </Button>
        </Link>
      </Grid>
    </>
  )
}

export default MentorTabs
