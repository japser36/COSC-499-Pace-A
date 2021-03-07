import Layout from '../../components/layout'
import UserSignUp from '../../components/UserSignUp'
import { server } from '../../config'

const Match = ({ message }) => {
  return <>{message}</>
}

export async function getServerSideProps(context) {
  let mentee
  await fetch(`${server}/api/user/${context.query.mentee_id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => (mentee = res.rows[0]))

  let message
  if (!mentee.mentor_id) {
    await fetch(`${server}/api/user/set-mentor`, {
      method: 'POST',
      body: JSON.stringify({
        mentee_id: mentee.id,
        mentor_id: context.query.mentor_id,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    message = `Success! You've been matched with ${mentee.displayname}`
  } else if (mentee.mentor_id === context.query.mentor_id) {
    message = `You've already matched with ${mentee.displayname}`
  } else {
    message = `Too late. ${mentee.displayname} already has a mentor.`
  }
  return {
    props: {
      message: message,
    },
  }
}

export default Match
