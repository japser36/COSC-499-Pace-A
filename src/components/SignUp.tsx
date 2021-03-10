import { useState } from 'react'
import UserTypeField from './UserTypeField'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import { getFirebaseAuth } from '../lib/firebase'
import axios from 'axios'
import {Collapse} from 'react-collapse';
import OrgSignUp from '../components/OrgSignUp'
import UserSignUp from '../components/UserSignUp'

const SignUp = ({ userType }) => {
  switch (userType) {
    case 'org':
      return <OrgSignUp />
    case 'mentee':
      return <UserSignUp userType="mentee" org_id="TESTORG1" org_name="TESTORG1" />
    case 'mentor':
      return <UserSignUp userType="mentor" org_id="TESTORG1" org_name="TESTORG1" />
    default:
      return <></>
  }
}
export default SignUp
