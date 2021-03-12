import { useState } from 'react'
import SignIn from './SignIn'
import PasswordReset from './PasswordReset'
import Button from '@material-ui/core/Button'

const SignInFlow = () => {
  const [component, setComponent] = useState('signin')
  switch (component) {
    case 'signin':
      return (
        <div>
          <SignIn />
            <Button
              variant="text"
              onClick={() => {
                setComponent('passwordreset')
              }}
            >
              Reset Your Password
            </Button>
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
