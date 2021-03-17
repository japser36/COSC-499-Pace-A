import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'
import { getMenteesMentor, getUserType } from '../../../utils/api'
import UserCard from '../../../components/UserDisplays/UserCard'

const Mentor = (props) => {
    const auth = props.auth
  const usertype = props.usertype
  const mentor = JSON.parse(props.mentor)

  return (
      <Layout title='Mentor' auth={auth} usertype={usertype} >
          {mentor ? <UserCard user={mentor} />
          : <>TODO: show something when mentee has no mentor</>
          }
      </Layout>
  )
}

export const getServerSideProps = async (context) => {
    try {
      const cookies = nookies.get(context)
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
      const uid = token.uid
      const usertype = await getUserType(uid)
      if (usertype !== 'org') throw 'Must be an organization to see this page'
      const mentor = await getMenteesMentor(uid)
  
      return {
        props: { 
          auth: true,
          usertype: usertype,
          mentor: JSON.stringify(mentor)
        },
      };
    } catch (error) {
      console.log(error)
      return {
        props: {
          auth: false
        },
      };
    }
  };

export default Mentor