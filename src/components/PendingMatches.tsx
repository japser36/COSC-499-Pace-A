import PendingMatch from './PendingMatch'
import { Paper, CircularProgress } from '@material-ui/core'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const PendingMatches = ({ mentor_id }) => {
  const { data, error } = useSWR('/api/pendingmatches/' + mentor_id, fetcher)

  if (error) {
    console.log(error)
    return <>Error...</>
  }
  if (!data) {
    return <CircularProgress />
  }

  const pendingmatches = data.rows

  return (
    <Paper elevation={0}>
      {pendingmatches.map((pendingmatch) => (
        <PendingMatch
          key={pendingmatch.id}
          mentee_id={pendingmatch.mentee_id}
          mentor_id={mentor_id}
          shared_skills={pendingmatch.skills}
        />
      ))}
    </Paper>
  )
}

export default PendingMatches
