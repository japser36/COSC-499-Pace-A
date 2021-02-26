import useSWR from 'swr'
import OrgProfile from '../components/OrgProfile'
import MentorProfile from '../components/MentorProfile'

const fetcher = (url) => fetch(url).then(res => res.json())

const Profile = ({ id }) => {
    const { data, error } = useSWR('/api/metauser/' + id, fetcher)

    if (error) {
        console.log(error)
        return (<>Error...</>)
    }
    if (!data) {
        return (<>Loading...</>)
    }
    const userType = data.rows[0].usertype

    switch (userType) {
        case 'org':
            return (
                <OrgProfile id={id}/>
            )
        case 'mentor':
            return (
                <MentorProfile id={id}/>
            )
        default:
            return (<></>)
    }
}

export default Profile