import UserCard from './UserCard'

const UserList = ({ users, subheader = null, deletable = false }) => {
  return (
    <>
      {users.map((user) => (
        <UserCard key={user.id} user={user} subheader={subheader} deletable={deletable} />
      ))}
    </>
  )
}

export default UserList
