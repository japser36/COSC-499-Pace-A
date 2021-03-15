import {
  Divider,
  CircularProgress,
  Collapse,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { useState } from 'react'

const UserCard = ({ user }) => {
  const [open, setOpen] = useState(false)
  
  return (
    <Card variant="outlined">
      <CardHeader
        onClick={() => {
          setOpen(!open)
        }}
        action={<IconButton>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>}
        title={user.displayname}
        subheader={user.usertype}
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
      </Collapse>
    </Card>
  )
}

export default UserCard
