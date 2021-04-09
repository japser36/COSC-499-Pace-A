import { useState } from 'react'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { firebaseClient } from '../../lib/auth/firebaseClient'
import { getUserType } from '../../utils/api'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()
  const auth = firebaseClient.auth()
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser.user.emailVerified) {
          // Signed In
          getUserType(authUser.user.uid).then((usertype) => {
            router.push(`/app/${usertype}/profile`)
          })
        } else {
          auth.signOut()
          setError('Email not verified')
        }
      })
      .catch((e) => {
        setError(e.message)
      })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id
    const value = event.target.value
    if (id === 'email') {
      setEmail(value)
    } else if (id === 'password') {
      setPassword(value)
    }
  }
  return (
    <div>
      <h1>Sign In</h1>
      {error !== null && <div>{error}</div>}
      <ValidatorForm onSubmit={signIn}>
        <Grid container spacing={1} direction="column" justify="flex-start" alignItems="center">
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
            <TextValidator
              id="password"
              label="Password"
              variant='outlined'
              value={password}
              onChange={handleChange}
              type="password"
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Grid>
          <Grid>
            <br></br>
            <Button type="submit" variant="contained">
              Sign In
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  )
}
export default SignIn
