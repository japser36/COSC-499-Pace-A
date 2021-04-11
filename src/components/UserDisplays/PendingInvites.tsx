import { List, Typography } from '@material-ui/core'

const PendingInvites = ({ invites }) => {
    return (
        <List
              subheader={
                <Typography variant='h5'>Active Invites</Typography>
              }
            >
              {invites.map((invite) => (
                  <Typography >{invite.email}</Typography>
              ))}
        </List>
    )
}

export default PendingInvites