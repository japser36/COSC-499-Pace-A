import { useState, useEffect } from 'react'
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import TimezoneSelect from '../Misc/TimezoneSelect'
import SkillSelect from '../Misc/SkillSelect'
import { firebaseClient } from '../../lib/auth/firebaseClient'
import { insertUser } from '../../utils/api'

const UserSignUp = ({ usertype, org_id, org_name, mentor_email = null }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState(mentor_email ? mentor_email : '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [timezone, setTimezone] = useState(null)
  const [skills, setSkills] = useState([])
  const [bio, setBio] = useState('')
  const [verificationSent, setVerificationSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const auth = firebaseClient.auth()
  const createUser = () => {
    setLoading(true)
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        //Add new user to the database
        insertUser(
          user.user.uid,
          firstName,
          lastName,
          displayName,
          email,
          timezone,
          skills,
          bio,
          org_id,
          usertype
        ).then(() => {
          auth.currentUser.sendEmailVerification().then(() => {
            setVerificationSent(true)
            setLoading(false)
            auth.signOut()
          })
        })
      })
      .catch((e) => {
        setError(e.message)
        setLoading(false)
        auth.signOut()
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
    } else if (id === 'bio') {
      setBio(value)
    }
  }

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
        return false
      }
      return true
    })
    ValidatorForm.addValidationRule('requireTimezone', (value) => {
      if (!timezone) {
        return false
      }
      return true
    })
    ValidatorForm.addValidationRule('requireSkills', (value) => {
      if (skills.length === 0) {
        return false
      }
      return true
    })
    return () => {
      ValidatorForm.removeValidationRule('isPasswordMatch')
      ValidatorForm.removeValidationRule('requireTimezone')
      ValidatorForm.removeValidationRule('requireSkills')
    }
  })

  return (
    <div>
      {verificationSent ? (
        'Email verification sent.'
      ) : (
        <>
          <h1>
            Become a {usertype} for {org_name}
          </h1>
          {error !== null && <div>{error}</div>}
          <ValidatorForm onSubmit={createUser}>
            <Grid container justify="center" alignItems="center">
              <Grid container item direction="column" alignItems="center" xs>
                <Grid item xs>
                  <TextValidator
                    id="first-name"
                    label="First Name *"
                    value={firstName}
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </Grid>
                <Grid item xs>
                  <TextValidator
                    id="last-name"
                    label="Last Name *"
                    value={lastName}
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </Grid>
                <Grid item xs>
                  <TextValidator
                    id="email"
                    label="Email *"
                    value={email}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: mentor_email ? true : false,
                    }}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                  />
                </Grid>
                <Grid item xs>
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
                <Grid item xs>
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
              </Grid>
              <Grid container item direction="column" alignItems="center" xs>
                <Grid item xs>
                  <TextField id="display-name" label="Display Name" value={displayName} onChange={handleChange} />
                </Grid>
                <Grid item xs>
                  <TimezoneSelect
                    setTimezone={setTimezone}
                    required
                    validators={['requireTimezone']}
                    errorMessages={['this field is required']}
                  />
                </Grid>
                <Grid item xs>
                  <SkillSelect
                    setSkills={setSkills}
                    required
                    validators={['requireSkills']}
                    errorMessages={['this field is required']}
                  />
                </Grid>
                <Grid item xs>
                  <TextValidator
                    id="bio"
                    label="About Me *"
                    value={bio}
                    multiline
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained">
              Sign Up
              {loading && <CircularProgress />}
            </Button>
          </ValidatorForm>
        </>
      )}
    </div>
  )
}
export default UserSignUp
