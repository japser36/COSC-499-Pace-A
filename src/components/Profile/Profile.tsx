import OrgProfile from './OrgProfile'
import MentorProfile from './MentorProfile'

const Profile = ({ id, userType }) => {
  switch (userType) {
    case 'org':
      return <OrgProfile id={id} />
    case 'mentor':
      return <MentorProfile id={id} />
    default:
      return <>There is no profile for this user/userType</>
  }
}

export default Profile
