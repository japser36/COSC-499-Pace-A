import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@material-ui/core'
import { deleteUser } from '../../utils/api'
import { useState } from 'react'
import UserCard from '../UserDisplays/UserCard'

const DeleteUserButton = ({ user, setDeleted }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleYes = () => {
    setLoading(true)
    deleteUser(user.id).then(() => {
      setDeleted(true)
      setOpen(false)
      setLoading(false)
    })
  }

  const handleNo = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true)
        }}
      >
        Delete User
      </Button>
      <Dialog open={open}>
        <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
        <DialogContent>
          <UserCard user={user} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes}>
            Yes
            {loading && <CircularProgress />}
          </Button>
          <Button onClick={handleNo}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteUserButton
