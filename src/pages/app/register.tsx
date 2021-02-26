import Layout from '../../components/layout'
import SignUp from '../../components/SignUp'
import Button from '@material-ui/core/Button'
import { useState } from 'react'

export default function Register() {
  const [userType, setUserType] = useState('default')
  return (
    <Layout>
      <Button variant='contained' onClick={() => {setUserType('org')}}>Register an Organization</Button>
      <br></br>
      <Button variant='contained' onClick={() => {setUserType('mentee')}}>Register as a Mentee</Button>
      <br></br>
      <Button variant='contained' onClick={() => {setUserType('mentor')}}>Register as a Mentor</Button>
      <br></br>
      <SignUp userType={userType}/>
    </Layout>
  )
}
