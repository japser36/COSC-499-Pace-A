import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { firebaseClient } from '../../lib/auth/firebaseClient'

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
    firebaseClient.auth()
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
