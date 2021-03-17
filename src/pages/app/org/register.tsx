import OrgSignUp from '../../../components/SignIn/OrgSignUp'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'
import Layout from '../../../components/layout'
import { getUserType } from '../../../utils/api'

const RegisterOrg = (props) => {
  const auth = props.auth
  const usertype = props.usertype

  return (
    <Layout title='Register Org' auth={auth} usertype={usertype} >
      <OrgSignUp />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const uid = token.uid
    const usertype = await getUserType(uid)

    return {
      props: { 
        auth: true,
        usertype: usertype
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

export default RegisterOrg
