import UserCard from "../UserDisplays/UserCard"


const MentorProfile = ({ user }) => {
  return (
    <>
      <p>ID: {user.id}</p>
      <p>First Name: {user.firstname}</p>
      <p>Last Name: {user.lastname}</p>
      <p>Display Name: {user.displayname}</p>
      <p>Email: {user.email}</p>
      <p>Timezone: {JSON.parse(user.timezone).label}</p>
      <p>Skills: {user.skills}</p>
    </>
  )
}

export default MentorProfile
