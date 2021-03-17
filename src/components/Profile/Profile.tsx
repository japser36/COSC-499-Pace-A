import OrgProfile from './OrgProfile'
import MentorProfile from './MentorProfile'

const Profile = ({ user, org, usertype }) => {
  switch (usertype) {
    case 'org':
      return <OrgProfile org={org} />
    case 'mentor':
      return <MentorProfile user={user} />
    default:
      return <>There is no profile for this user/userType</>
  }
}

export default Profile
