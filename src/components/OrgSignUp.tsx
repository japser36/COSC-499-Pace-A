import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { getFirebaseAuth } from '../lib/firebase'
import fetch from 'node-fetch'

const OrgSignUp = () => {
  const [orgName, setOrgName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [verificationSent, setVerificationSent] = useState(false)
  const [error, setError] = useState(null)
  const auth = getFirebaseAuth()
  const addOrg = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      auth.currentUser.sendEmailVerification().then(() => {
        setVerificationSent(true)
      })
      //Add new user to the database
      fetch('/api/org/insert', {
          method: 'POST',
          body: JSON.stringify({
              id: user.user.uid,
              org_name: orgName,
              email: email
          }),
          headers: {'Content-Type': 'application/json'}
      }).then(res => res.json())
        .then(json => console.log(json))
        fetch('/api/metauser/insert', {
            method: 'POST',
            body: JSON.stringify({
                id: user.user.uid,
                userType: 'org'
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
          .then(json => console.log(json))
    })
    .catch((e) => {
      setError(e.message)
    })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id
    const value = event.target.value
    if (id === 'org-name') {
        setOrgName(value)
    } else if (id === 'email') {
        setEmail(value)
    } else if (id === 'password') {
        setPassword(value)
    } else if (id === 'confirm-password') {
        setConfirmPassword(value)
    }
  }
  return (
    <div>
      {verificationSent ? (
        'Email verification sent.'
      ) : (
        <>
          <h1>Register an organization</h1>
          <div>
            {error !== null && <div>{error}</div>}
            <Grid container spacing={1} direction="column" justify="flex-start" alignItems="flex-start">
              <Grid item>
                <TextField required id="org-name" label="Organization Name" value={orgName} onChange={handleChange} />
               </Grid>
              <Grid item>
                <TextField required id="email" label="Email" value={email} onChange={handleChange} />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="password"
                  label="Password"
                  value={password}
                  onChange={handleChange}
                  type="password"
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="confirm-password"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={handleChange}
                  type="password"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={addOrg}>
                    Register
                </Button>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </div>
  )
}
export default OrgSignUp
