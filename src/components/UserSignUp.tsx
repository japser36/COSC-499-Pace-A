import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import TimezoneSelect from './TimezoneSelect'
import SkillSelect from './SkillSelect'
import { getFirebaseAuth } from '../lib/firebase'

const UserSignUp = ({ userType, org_id, org_name, mentor_email=null }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState(mentor_email ? mentor_email : '')
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
        auth.signOut()
        //Add new user to the database
        fetch('/api/user/insert', {
          method: 'POST',
          body: JSON.stringify({
            id: user.user.uid,
            firstName: firstName,
            lastName: lastName,
            displayName: displayName,
            email: email,
            timezone: timezone ? timezone.value : null,
            skills: skills ? JSON.stringify(skills) : null,
            org_id: org_id,
            userType: userType,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .then((json) => console.log(json))
        fetch('/api/metauser/insert', {
          method: 'POST',
          body: JSON.stringify({
            id: user.user.uid,
            userType: userType,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .then((json) => console.log(json))
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

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
        return false
      }
      return true
    })
    return () => {
      ValidatorForm.removeValidationRule('isPasswordMatch')
    }
  })

  return (
    <div>
      {verificationSent ? (
        'Email verification sent.'
      ) : (
        <>
          <h1>Become a {userType} for {org_name}</h1>
          {error !== null && <div>{error}</div>}
          <ValidatorForm onSubmit={createUser}>
            <Grid container spacing={1} direction="column" justify="flex-start" alignItems="flex-start">
              <Grid item>
                <TextValidator
                  id="first-name"
                  label="First Name *"
                  value={firstName}
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid>
                <TextValidator
                  id="last-name"
                  label="Last Name *"
                  value={lastName}
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item>
                <TextField id="display-name" label="Display Name" value={displayName} onChange={handleChange} />
              </Grid>
              <Grid item>
                <TextValidator
                  id="email"
                  label="Email *"
                  value={email}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: mentor_email ? true : false
                  }}
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                />
              </Grid>
              <Grid item>
                <TextValidator
                  id="password"
                  label="Password *"
                  value={password}
                  onChange={handleChange}
                  type="password"
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item>
                <TextValidator
                  id="confirm-password"
                  label="Confirm Password *"
                  value={confirmPassword}
                  onChange={handleChange}
                  type="password"
                  validators={['required', 'isPasswordMatch']}
                  errorMessages={['this field is required', 'password does not match']}
                />
              </Grid>
              <Grid item>
                <TimezoneSelect setTimezone={setTimezone} />
              </Grid>
              <Grid>
                <SkillSelect setSkills={setSkills} />
              </Grid>
            <br></br>
              <Grid>
                <Button type="submit" variant="contained">
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </>
      )}
    </div>
  )
}
export default UserSignUp
