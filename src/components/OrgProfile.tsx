import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

const OrgProfile = ({ id }) => {

    const { data, error } = useSWR('/api/org/' + id, fetcher)

  if (error) {
      console.log(error)
      return (<>Error...</>)
  }
  if (!data) {
      return (<>Loading...</>)
  }
  const org = data.rows[0]
  return(
    <>
        <p>ID: {org.id}</p>
        <p>Email: {org.email}</p>
        <p>Organization Name: {org.org_name}</p>
    </>
  )
}

export default OrgProfile