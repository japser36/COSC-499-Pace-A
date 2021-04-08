import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Divider,
  Tooltip,
  CircularProgress,
} from '@material-ui/core'
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@material-ui/icons'
import { useState } from 'react'
import { parseSkills } from '../../utils/misc'
import { setUserDisplayName, setUserBio } from '../../utils/api'

const MenteeProfile = ({ mentee, org }) => {
  const [displayName, setDisplayName] = useState(mentee.displayname)
  const [newDisplayName, setNewDisplayName] = useState(mentee.displayname)
  const [bio, setBio] = useState(mentee.bio)
  const [newBio, setNewBio] = useState(mentee.bio)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = () => {
    setLoading(true)
    setUserDisplayName(mentee.id, newDisplayName)
    .then(() => {
      setDisplayName(newDisplayName)
      setUserBio(mentee.id, newBio)
      .then(() => {
        setBio(newBio)
        setEditing(false)
        setLoading(false)
      })
    })
  }

  const handleCancel = () => {
    setNewDisplayName(displayName)
    setNewBio(bio)
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
              label="Display Name"
              value={newDisplayName}
              placeholder={mentee.displayName}
              onChange={(event) => setNewDisplayName(event.target.value)}
            />
          }
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
          title={displayName}
          subheader={org.org_name}
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
        <Typography>{mentee.firstname + ' ' + mentee.lastname}</Typography>
        <Typography>{mentee.email}</Typography>
        <Typography>{`Skills: ${parseSkills(mentee.skills).toString()}`}</Typography>
        {editing ? (
          <TextField
            fullWidth
            multiline
            variant="outlined"
            label="About Me"
            value={newBio}
            placeholder={mentee.bio}
            onChange={(event) => setNewBio(event.target.value)}
          />
        ) : (
          <Typography>{`About Me: ${bio}`}</Typography>
        )}
        <Typography>{JSON.parse(mentee.timezone).label}</Typography>
      </CardContent>
    </Card>
  )
}

export default MenteeProfile
