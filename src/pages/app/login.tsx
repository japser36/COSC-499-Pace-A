import Layout from '../../components/layout'
import SignInFlow from '../../components/SignInFlow'
import Navbar from '../../components/Navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function Login() {
  return (
    <Router>
      <Navbar />
      <Layout>
        <SignInFlow />
      </Layout>
    </Router>
  )
}
