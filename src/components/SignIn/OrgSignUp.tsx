import { useState, useEffect } from 'react'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { firebaseClient } from '../../lib/auth/firebaseClient'
import { insertOrg } from '../../utils/api'

const OrgSignUp = () => {
  const [orgName, setOrgName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [verificationSent, setVerificationSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const auth = firebaseClient.auth()
  const addOrg = () => {
    setLoading(true)
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        //Add new org to the database
        insertOrg(user.user.uid, orgName, email).then(() => {
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
          <h1>Register an organization</h1>
          {error !== null && <div>{error}</div>}
          <ValidatorForm onSubmit={addOrg}>
            <Grid container spacing={1} direction="column" justify="flex-start" alignItems="center">
              <Grid item>
                <TextValidator
                  id="org-name"
                  label="Organization Name *"
                  value={orgName}
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item>
                <TextValidator
                  id="email"
                  label="Email *"
                  value={email}
                  onChange={handleChange}
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
                <br></br>
                <Button type="submit" variant="contained">
                  Register
                  {loading && <CircularProgress />}
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </>
      )}
    </div>
  )
}

export default OrgSignUp
