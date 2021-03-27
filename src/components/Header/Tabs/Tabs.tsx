import OrgTabs from './OrgTabs'
import MentorTabs from './MentorTabs'
import MenteeTabs from './MenteeTabs'

const Profile = ({ usertype }) => {
  switch (usertype) {
    case 'org':
      return <OrgTabs />
    case 'mentor':
      return <MentorTabs />
    case 'mentee':
      return <MenteeTabs />
    default:
      return <></>
  }
}

export default Profile
