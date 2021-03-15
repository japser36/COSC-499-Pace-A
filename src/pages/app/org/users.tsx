import UserList from '../../../components/UserDisplays/UserList'
import { getUserType, getOrgUsers } from '../../../utils/api'
import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'
import { redirectToLogin } from '../../../utils/misc'

const Users = (props) => {
  const auth = props.auth
  const usertype = props.usertype
  const users = JSON.parse(props.users)

  return (
    <Layout title='Users' auth={auth} usertype={usertype} >
      {
      users ? <UserList users={users} /> : <>TODO: display something when org has no users</>
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
    const users = await getOrgUsers(uid)


    return {
      props: { 
        auth: true,
        usertype: usertype,
        users: JSON.stringify(users)
      },
    };
  } catch (error) {
    console.log(error)
    redirectToLogin(context)
    return {
      props: {
        auth: false
      },
    };
  }
};

export default Users
