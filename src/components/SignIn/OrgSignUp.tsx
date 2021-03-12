import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { getFirebaseAuth } from '../../lib/firebase'
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
        auth.signOut()
        //Add new user to the database
        fetch('/api/org/insert', {
          method: 'POST',
          body: JSON.stringify({
            id: user.user.uid,
            org_name: orgName,
            email: email,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .then((json) => console.log(json))
        fetch('/api/metauser/insert', {
          method: 'POST',
          body: JSON.stringify({
            id: user.user.uid,
            userType: 'org',
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
