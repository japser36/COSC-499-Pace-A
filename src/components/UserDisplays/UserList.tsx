import { Paper } from '@material-ui/core'
import UserCard from './UserCard'

const UserList = ({ users, subheader = null, deletable = false }) => {
  return (
    <Paper elevation={0}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} subheader={subheader} deletable={deletable} />
      ))}
    </Paper>
  )
}

export default UserList
