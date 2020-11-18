import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const PasswordReset = () => {
  const [email, setEmail] = useState('')
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false)
  const [error, setError] = useState(null)
  const handleChange = (event) => {
    const { name, value } = event.currentTarget
    if (name === 'userEmail') {
      setEmail(value)
    }
  }
  const sendResetEmail = (event) => {
    event.preventDefault()
    //TODO: this method should send an email to the user with the password reset link.
  }
  return (
    <div>
      <h1>Reset your Password</h1>
      <div>
        <form action="">
          {emailHasBeenSent && <div>An email has been sent to you!</div>}
          {error !== null && <div>{error}</div>}
          <TextField
            label="Email"
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email address"
            onChange={handleChange}
          />
          <Button variant="contained" onClick={sendResetEmail}>
            Send me a reset link
          </Button>
        </form>
      </div>
    </div>
  )
}
export default PasswordReset
