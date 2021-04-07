import { TextField, Card, CardHeader, CardContent, Typography, IconButton, Divider, Tooltip } from '@material-ui/core'
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@material-ui/icons'
import { useState } from 'react'
import { parseSkills } from '../../utils/misc'
import { setUserDisplayName, setUserBio, setUserCalendar } from '../../utils/api'

const MentorProfile = ({ mentor, org }) => {
  const [displayName, setDisplayName] = useState(mentor.displayname)
  const [newDisplayName, setNewDisplayName] = useState(mentor.displayname)
  const [bio, setBio] = useState(mentor.bio)
  const [newBio, setNewBio] = useState(mentor.bio)
  const [calendar, setCalendar] = useState(mentor.calendar)
  const [newCalendar, setNewCalendar] = useState(mentor.calendar)
  const [editing, setEditing] = useState(false)

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = () => {
    setDisplayName(newDisplayName)
    setBio(newBio)
    setCalendar(newCalendar)
    setUserDisplayName(mentor.id, newDisplayName)
    setUserBio(mentor.id, newBio)
    setUserCalendar(mentor.id, newCalendar)
    setEditing(false)
  }

  const handleCancel = () => {
    setNewDisplayName(displayName)
    setNewBio(bio)
    setNewCalendar(calendar)
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
              placeholder={mentor.displayName}
              onChange={(event) => setNewDisplayName(event.target.value)}
            />
          }
          action={
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
        <Typography>{mentor.firstname + ' ' + mentor.lastname}</Typography>
        <Typography>{mentor.email}</Typography>
        <Typography>{`Skills: ${parseSkills(mentor.skills).toString()}`}</Typography>
        <Typography>{JSON.parse(mentor.timezone).label}</Typography>
        {editing ? (
          <>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              label="About Me"
              value={newBio}
              placeholder={mentor.bio}
              onChange={(event) => setNewBio(event.target.value)}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Calendar"
              helperText="Add a link to your calendar. This will be shared with your mentees."
              value={newCalendar}
              placeholder={mentor.calendar}
              onChange={(event) => setNewCalendar(event.target.value)}
            />
          </>
        ) : (
          <>
            <Typography>{`About Me: ${bio}`}</Typography>
            <Typography>{`My Calendar: ${calendar ? calendar : 'You have not linked a calendar'}`}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default MentorProfile
