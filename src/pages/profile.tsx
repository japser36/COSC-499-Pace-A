import { useUser } from '../lib/auth/useUser'
import Layout from '../components/layout'
import Button from '@material-ui/core/Button'
import ProfileHead from '../components/Profile/ProfileHead'

export default function LoggedIn() {
  const { user, logout } = useUser()

  return (
      <ProfileHead />
  )
}
