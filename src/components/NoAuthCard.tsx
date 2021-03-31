import { Card, CardHeader, CardContent, CardActions, Typography, Button } from '@material-ui/core'
import Link from 'next/link'

const NoAuthCard = () => {
  return (
    <Card>
      <CardHeader title={`You don't have permission to see this page.`} />
      <CardContent>
        <Typography>{`Login to an authorized account or return to the home page.`}</Typography>
      </CardContent>
      <CardActions>
        <Link href="/app/login" passHref>
          <Button>Login</Button>
        </Link>
        <Link href="/" passHref>
          <Button>Home</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default NoAuthCard
