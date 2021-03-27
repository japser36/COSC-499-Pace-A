import { Paper } from '@material-ui/core'
import UserCard from './UserCard'

const UserList = ({ users, subheader=null }) => {

  return (
    <Paper elevation={0} >
      {users.map((user) => (
        <UserCard key={user.id} user={user} subheader={subheader} />
      ))}
    </Paper>
  )
}

export default UserList
