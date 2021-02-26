import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import TimezoneSelect from './TimezoneSelect'
import SkillSelect from './SkillSelect'
import { getFirebaseAuth } from '../lib/firebase'

const UserSignUp = ({ userType, org_id }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [timezone, setTimezone] = useState(null)
  const [skills, setSkills] = useState(null)
  const [verificationSent, setVerificationSent] = useState(false)
  const [error, setError] = useState(null)
  const auth = getFirebaseAuth()
  const createUser = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        auth.currentUser.sendEmailVerification().then(() => {
          setVerificationSent(true)
        })
        //Add new user to the database
        fetch('/api/user/insert', {
            method: 'POST',
            body: JSON.stringify({
                id: user.user.uid,
                firstName: firstName,
                lastName: lastName,
                displayName: displayName,
                email: email,
                timezone: timezone.value,
                skills: JSON.stringify(skills),
                org_id: org_id,
                userType: userType
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
          .then(json => console.log(json))
          fetch('/api/metauser/insert', {
            method: 'POST',
            body: JSON.stringify({
                id: user.user.uid,
                userType: userType
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
    if (id === 'first-name') {
      setFirstName(value)
    } else if (id === 'last-name') {
      setLastName(value)
    } else if (id === 'display-name') {
      setDisplayName(value)
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
          <h1>Sign up as a {userType}</h1>
          <div>
            {error !== null && <div>{error}</div>}
            <Grid container spacing={1} direction="column" justify="flex-start" alignItems="flex-start">
              <Grid item>
                <TextField required id="first-name" label="First Name" value={firstName} onChange={handleChange} />
              </Grid>
              <Grid>
                <TextField required id="last-name" label="Last Name" value={lastName} onChange={handleChange} />
              </Grid>
              <Grid item>
                <TextField id="display-name" label="Display Name" value={displayName} onChange={handleChange} />
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
                  <TimezoneSelect setTimezone={setTimezone}/>
              </Grid>
              <Grid>
                <SkillSelect setSkills={setSkills}/>
              </Grid>
              <Grid>
                <Button variant="contained" onClick={createUser}>
                    Sign Up
                </Button>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </div>
  )
}
export default UserSignUp
