import { Paper, Grid, Button, Typography, CircularProgress } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { sendMentorInvite, insertPendingInvite, deletePendingInvite } from '../../utils/api'
import { useState } from 'react'

const MentorInvite = ({ org_id }) => {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id
    const value = event.target.value
    if (id === 'email') {
      setEmail(value)
    }
  }

  const sendInvite = () => {
    setLoading(true)
    insertPendingInvite(org_id, email)
      .then(() => {
        sendMentorInvite(org_id, email)
        .then(() => {
          setSent(true)
          setLoading(false)
          setEmail('')
        })
        .catch((error) => {
          deletePendingInvite(org_id, email)
            .then(() => {
              setLoading(false)
              console.log(error)
        })
      })
      .catch((error) => {
          setLoading(false)
          console.log(error)
      })
    })
  }

  return (
    <Paper elevation={0}>
      <Typography variant="h5">Invite a new Mentor</Typography>
      {sent ? (
        <>
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <Typography variant="h6">Inivitation has been sent.</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  setSent(false)
                }}
              >
                Send Another
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <ValidatorForm onSubmit={sendInvite}>
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <TextValidator
                id="email"
                label="Email"
                variant='outlined'
                value={email}
                onChange={handleChange}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">
                Send Invite
                {loading && <CircularProgress />}
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      )}
    </Paper>
  )
}

export default MentorInvite
