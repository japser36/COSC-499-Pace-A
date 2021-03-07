import useSWR from 'swr'
import {
  Button,
  Divider,
  CircularProgress,
  Collapse,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { useState } from 'react'
import { fetcher, acceptPendingMatch } from '../utils/api'

const PendingMatch = ({ mentee_id, mentor_id, shared_skills }) => {
  const [open, setOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const { data, error } = useSWR('/api/user/' + mentee_id, fetcher)
  const handleAccept = () => {
    acceptPendingMatch(mentee_id, mentor_id)
      .then(() => {
        setAccepted(true)
        setOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (error) {
    console.log(error)
    return <>{error}</>
  }
  if (!data) {
    return <CircularProgress />
  }
  const mentee = data.rows[0]
  return (
    <Card variant="outlined">
      <CardHeader
        disabled={accepted}
        onClick={() => {
          setOpen(!open)
        }}
        action={<IconButton>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>}
        title={accepted ? `${mentee.displayname}: Accepted` : mentee.displayname}
      />
      <Divider />
      <Collapse in={open} unmountOnExit>
        <CardContent>
          <Typography variant="h6">{'Shared Skills:'}</Typography>
          {JSON.parse(shared_skills).map((skill) => (
            <Typography key={skill.name} variant="body1">
              {skill.name}
            </Typography>
          ))}
          <Typography variant="body1">{JSON.parse(mentee.timezone).label}</Typography>
          {accepted ? null : (
            <CardActions>
              <Button size="large" variant="contained" onClick={handleAccept}>
                ACCEPT
              </Button>
            </CardActions>
          )}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default PendingMatch
