import PendingMatch from './PendingMatch'
import { Paper } from '@material-ui/core'

const PendingMatches = ({ pendingmatches }) => {
  return (
    <Paper elevation={0}>
      {pendingmatches.map((pendingmatch) => (
        <PendingMatch
          key={pendingmatch.id}
          mentee_id={pendingmatch.mentee_id}
          mentor_id={pendingmatch.mentor_id}
          matched_skills={pendingmatch.skills}
        />
      ))}
    </Paper>
  )
}

export default PendingMatches
