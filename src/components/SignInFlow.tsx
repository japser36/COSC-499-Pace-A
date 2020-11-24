import { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import PasswordReset from './PasswordReset'
import Button from '@material-ui/core/Button'

const SignInFlow = () => {
  const [component, setComponent] = useState('signin')
  switch (component) {
    case 'signin':
      return (
        <div>
          <SignIn />
          <p>
            Don&apos;t have an account?
            <Button
              variant="text"
              onClick={() => {
                setComponent('signup')
              }}
            >
              Sign Up Here
            </Button>
          </p>
          <p>
            Forgot your password?
            <Button
              variant="text"
              onClick={() => {
                setComponent('passwordreset')
              }}
            >
              Reset Your Password
            </Button>
          </p>
        </div>
      )
    case 'signup':
      return (
        <div>
          <SignUp />
          <p>
            Already have an account?
            <Button
              variant="text"
              onClick={() => {
                setComponent('signin')
              }}
            >
              Sign In Here
            </Button>
          </p>
        </div>
      )
    case 'passwordreset':
      return (
        <div>
          <PasswordReset />
          <p>
            Remembered your password?
            <Button
              variant="text"
              onClick={() => {
                setComponent('signin')
              }}
            >
              Sign In Here
            </Button>
          </p>
        </div>
      )
  }
}

export default SignInFlow
