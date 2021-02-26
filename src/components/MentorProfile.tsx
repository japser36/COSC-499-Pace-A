import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

const MentorProfile = ({ id }) => {

    const url = '/api/user/' + id
    const { data: user_res, error } = useSWR('/api/user/' + id, fetcher)
    const { data: org_res } = useSWR(() => '/api/org/' + user_res.rows[0].org_id, fetcher)

  if (error) {
      console.log(error)
      return (<>Error...</>)
  }
  if (!org_res) {
      return (<>Loading...</>)
  }

  const user = user_res.rows[0]
  const org = org_res.rows[0]
  return(
    <>
        <p>ID: {user.id}</p>
        <p>First Name: {user.firstname}</p>
        <p>Last Name: {user.lastname}</p>
        <p>Display Name: {user.displayname}</p>
        <p>Email: {user.email}</p>
        <p>Timezone: {user.timezone}</p>
        <p>Skills: {user.skills}</p>
        <p>Organization: {org.org_name}</p>
    </>
  )
}

export default MentorProfile