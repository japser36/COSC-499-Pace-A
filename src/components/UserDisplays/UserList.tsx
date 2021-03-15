import { Paper } from '@material-ui/core'
import UserCard from './UserCard'

const UserList = ({ users }) => {
  return (
    <Paper elevation={0}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Paper>
  )
}

export default UserList
