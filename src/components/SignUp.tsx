import { useState } from 'react'
import { Link } from '@reach/router'
import UserTypeField from './UserTypeField'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userType, setUserType] = useState('')
  const [userTypeFieldValue, setUserTypeFieldValue] = useState('')
  const [error, setError] = useState(null)
  const userTypes = [
    { value: 'Mentee', label: 'Mentee' },
    { value: 'Mentor', label: 'Mentor' },
    { value: 'Admin', label: 'Admin' },
  ]
  const createUser = () => {
    //TODO
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
    } else if (id === 'user-type-field') {
      setUserTypeFieldValue(value)
    }
  }
  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value)
  }
  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <Grid container spacing={1} direction="column" justify="flex-start" alignItems="flex-start">
          <Grid item>
            <TextField required id="first-name" label="First Name" value={firstName} onChange={handleChange} />
            <TextField required id="last-name" label="Last Name" value={lastName} onChange={handleChange} />
          </Grid>
          <Grid item>
            <TextField id="display-name" label="Display Name" value={displayName} onChange={handleChange} />
          </Grid>
          <Grid item>
            <TextField required id="email" label="Email" value={email} onChange={handleChange} />
          </Grid>
          <Grid item>
            <TextField
              required
              id="password"
              label="Password"
              value={password}
              onChange={handleChange}
              type="password"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="confirm-password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              type="password"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              select
              id="user-type"
              label="User Type"
              value={userType}
              onChange={handleUserTypeChange}
            >
              {userTypes.map((option) => (
                <MenuItem id="user-type-menu" key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <UserTypeField
              id="user-type-field"
              userType={userType}
              value={userTypeFieldValue}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={createUser}>
          Sign Up
        </Button>
        <p>
          Already have an account? <Link to="/">Sign in here</Link>
        </p>
      </div>
    </div>
  )
}
export default SignUp
