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
import DeleteUserButton from '../Inputs/DeleteUserButton'
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
      subheader = user.email
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
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="body1">{JSON.parse(user.timezone).label}</Typography>
          <Typography variant="h6">{'Skills:'}</Typography>
          {JSON.parse(user.skills).map((skill) => (
            <Typography key={skill.name} variant="body1">
              {skill.name}
            </Typography>
          ))}
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
