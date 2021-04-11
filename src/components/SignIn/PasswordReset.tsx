import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { firebaseClient } from '../../lib/auth/firebaseClient'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const PasswordReset = () => {
  const [email, setEmail] = useState('')
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false)
  const [error, setError] = useState(null)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id
    const value = event.target.value
    if (id === 'email') {
      setEmail(value)
    }
  }
  const sendResetEmail = () => {
    firebaseClient
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true)
        setTimeout(() => {
          setEmailHasBeenSent(false)
        }, 10000)
      })
      .catch((e) => {
        setError(e.message)
      })
  }
  return (
    <div>
      <h1>Reset your Password</h1>
      <div>
        <ValidatorForm onSubmit={sendResetEmail}>
          {emailHasBeenSent && <div>An email has been sent to you!</div>}
          {error !== null && <div>{error}</div>}
          <TextValidator
            label="Email"
            type="email"
            id="email"
            variant="outlined"
            value={email}
            placeholder="Enter your email address"
            onChange={handleChange}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
          />
          <Button type="submit" variant="contained">
            Send me a reset link
          </Button>
        </ValidatorForm>
      </div>
    </div>
  )
}
export default PasswordReset
