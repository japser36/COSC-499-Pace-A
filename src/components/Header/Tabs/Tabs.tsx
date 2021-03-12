import OrgTabs from './OrgTabs'
import MentorTabs from './MentorTabs'

const Profile = ({ id, userType }) => {
  switch (userType) {
    case 'org':
      return <OrgTabs id={id} />
    case 'mentor':
      return <MentorTabs id={id} />
    default:
      return <></>
  }
}

export default Profile
