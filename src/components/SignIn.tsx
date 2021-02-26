import { useState } from 'react'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { getFirebaseAuth } from '../lib/firebase'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()
  //const { user, logout } = useUser()
  const auth = getFirebaseAuth()
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser.user.emailVerified) {
          // Signed In
          router.push('../app/loggedin')
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
        <Grid container spacing={1} direction="column" justify="flex-start" alignItems="flex-start">
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
            <TextValidator
              id="password"
              label="Password"
              value={password}
              onChange={handleChange}
              type="password"
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Grid>
          <Grid>
            <Button 
              type='submit'
              variant="contained">
                Sign In
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  )
}
export default SignIn
