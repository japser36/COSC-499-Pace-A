import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Grid,
  Button,
  IconButton,
  Divider,
  Tooltip,
  CircularProgress,
} from '@material-ui/core'
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@material-ui/icons'
import IFrameCopy from '../Misc/IFrameCopy'
import Link from 'next/link'
import { useState } from 'react'
import { setOrgName } from '../../utils/api'

const OrgProfile = ({ org, mentees, mentors }) => {
  const [name, setName] = useState(org.org_name)
  const [newName, setNewName] = useState(org.org_name)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = () => {
    setLoading(true)
    setOrgName(org.id, newName)
      .then(() => {
        setName(newName)
        setEditing(false)
        setLoading(false)
    })
  }

  const handleCancel = () => {
    setNewName(name)
    setEditing(false)
  }

  return (
    <Card>
      {editing ? (
        <CardHeader
          title={
            <TextField
              fullWidth
              variant="outlined"
              label="Organization Name"
              value={newName}
              placeholder={org.org_name}
              onChange={(event) => setNewName(event.target.value)}
            />
          }
          subheader={org.email}
          action={
            <>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
              <Tooltip title="Save" placement="top">
                <IconButton onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel" placement="top">
                <IconButton onClick={handleCancel}>
                  <CancelIcon />
                </IconButton>
              </Tooltip>
              </>
            )}
            </>
          }
        />
      ) : (
        <CardHeader
          title={name}
          subheader={org.email}
          action={
            <Tooltip title="Edit" placement="top">
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          }
        />
      )}
      <Divider />
      <CardContent>
        <Grid container direction="row" justify="center">
          <Grid item>
            <List
              subheader={
                <Link href="/app/org/mentees" passHref>
                  <ListSubheader>
                    <Button variant="text">{`Mentees (${mentees.length})`}</Button>
                  </ListSubheader>
                </Link>
              }
            >
              {mentees.map((mentee) => (
                <ListItem key={mentee.id} divider>
                  <ListItemText primary={mentee.displayname} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item>
            <List
              subheader={
                <Link href="/app/org/mentors" passHref>
                  <ListSubheader>
                    <Button variant="text">{`Mentors (${mentors.length})`}</Button>
                  </ListSubheader>
                </Link>
              }
            >
              {mentors.map((mentor) => (
                <ListItem key={mentor.id} divider>
                  <ListItemText primary={mentor.displayname} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <IFrameCopy org_id={org.id} />
      </CardActions>
    </Card>
  )
}

export default OrgProfile
