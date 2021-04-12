import {
  Divider,
  CircularProgress,
  Collapse,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  IconButton,
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import DeleteUserButton from '../Misc/DeleteUserButton'
import { useState } from 'react'
import { parseSkills } from '../../utils/misc'

const UserCard = ({ user, subheader = null, deletable = false }) => {
  const [open, setOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)
  switch (subheader) {
    case 'usertype':
      subheader = user.usertype
      break
    case 'email':
      subheader = <a href={`mailto:${user.email}`}>{user.email}</a>
      break
    case 'skills':
      subheader = parseSkills(user.skills).toString()
      break
    default:
      subheader = null
      break
  }

  return (
    <Card variant="outlined">
      <CardHeader
        onClick={() => {
          setOpen(!open)
        }}
        action={<IconButton>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>}
        title={deleted ? user.displayname + ' - Deleted' : user.displayname}
        subheader={subheader}
      />
      <Divider />
      <Collapse in={open} unmountOnExit>
        <CardContent>
          <Typography variant="body1">{`${user.firstname} ${user.lastname}`}</Typography>
          <Typography variant="body1"><a href={`mailto:${user.email}`}>{user.email}</a></Typography>
          <Typography variant="body1">{`Bio: ${user.bio}`}</Typography>
          <Typography variant="body1">{`Timezone: ${JSON.parse(user.timezone).label}`}</Typography>
          <Typography variant="body1">{`Skills: ${parseSkills(user.skills).toString()}`}</Typography>
          {user.calendar ? <Typography variant="body1"><a href={user.calendar}>{`Calendar`}</a></Typography> : <></>}
        </CardContent>
        {deletable && !deleted ? (
          <CardActions>
            <DeleteUserButton user={user} setDeleted={setDeleted} />
          </CardActions>
        ) : (
          <></>
        )}
      </Collapse>
    </Card>
  )
}

export default UserCard
