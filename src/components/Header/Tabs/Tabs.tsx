import OrgTabs from './OrgTabs'
import MentorTabs from './MentorTabs'

const Profile = ({ userType }) => {
  switch (userType) {
    case 'org':
      return <OrgTabs />
    case 'mentor':
      return <MentorTabs />
    default:
      return <></>
  }
}

export default Profile
