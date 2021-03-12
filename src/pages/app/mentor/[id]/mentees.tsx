import UserList from '../../../../components/UserList'
import { server } from '../../../../config'
import fetch from 'node-fetch'

const Mentees = ({ mentees }) => {
  mentees = JSON.parse(mentees).rows
  return (
    <>
      {mentees.length === 0 ? (
        <>TODO: display something when mentor has no mentees</>
      ) : (
        <UserList users={mentees} />
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  let mentees = []
  await fetch(`${server}/api/user/get-mentees/${context.params.id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => (mentees = res))
  return {
    props: {
      mentees: JSON.stringify(mentees),
    },
  }
}

export default Mentees
