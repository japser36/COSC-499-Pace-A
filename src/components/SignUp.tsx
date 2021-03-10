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
