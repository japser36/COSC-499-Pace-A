import { Paper, Grid, Button, Typography, CircularProgress } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
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
    fetch('/api/sendmail/invitementor', {
      method: 'POST',
      body: JSON.stringify({
        recipient: email,
        org_id: org_id,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      setSent(true)
      setLoading(false)
      setEmail('')
    }).catch((error) => {
      setLoading(false)
      console.log(error)
    })
  }

  return (
    <Paper elevation={0}>
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
