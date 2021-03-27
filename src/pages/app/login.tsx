import SignInFlow from '../../components/SignIn/SignInFlow'
import Layout from '../../components/layout'

const Login = () => {
  return (
    <Layout title="Login" auth={false}>
      <SignInFlow />
    </Layout>
  )
}

export default Login
