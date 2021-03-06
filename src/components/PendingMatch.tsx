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
import { fetcher, acceptPendingMatch, declinePendingMatch } from '../utils/api'

const PendingMatch = ({ mentee_id, mentor_id, matched_skills }) => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('pending')
  const { data, error } = useSWR('/api/user/' + mentee_id, fetcher)
  const handleAccept = () => {
    acceptPendingMatch(mentee_id, mentor_id)
      .then(() => {
        setStatus('accepted')
        setOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleDecline = () => {
    declinePendingMatch(mentee_id, mentor_id)
        .then(() => {
            setStatus('declined')
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
        disabled={status}
        onClick={() => {
          setOpen(!open)
        }}
        action={<IconButton>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>}
        title={mentee.displayname}
        subheader={status}
      />
      <Divider />
      <Collapse in={open} unmountOnExit>
        <CardContent>
          <Typography variant="body1">{JSON.parse(mentee.timezone).label}</Typography>
          <Typography variant="h6">{'Matched Skills:'}</Typography>
          {JSON.parse(matched_skills).map((skill) => (
            <Typography key={skill.name} variant="body1">
              {skill.name}
            </Typography>
          ))}
          {status==='pending' ? (
            <CardActions>
              <Button size="large" variant="contained" onClick={handleAccept}>
                ACCEPT
              </Button>
              <Button size="large" variant="contained" onClick={handleDecline}>
                DECLINE
              </Button>
            </CardActions>
          ) : null}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default PendingMatch
