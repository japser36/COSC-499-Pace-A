import UserList from '../../../../components/UserDisplays/UserList'
import { server } from '../../../../config'

const Users = ({ users }) => {
  users = JSON.parse(users).rows
  return <>{users.length === 0 ? <>TODO: display something when org has no users</> : <UserList users={users} />}</>
}

export async function getServerSideProps(context) {
  let users = []
  await fetch(`${server}/api/org/users/${context.params.id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => (users = res))
  return {
    props: {
      users: JSON.stringify(users),
    },
  }
}

export default Users
