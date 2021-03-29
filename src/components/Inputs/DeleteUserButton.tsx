import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { deleteUser } from '../../utils/api'
import { useState } from 'react'
import UserCard from '../UserDisplays/UserCard'

const DeleteUserButton = ({ user, setDeleted }) => {
  const [open, setOpen] = useState(false)

  const handleYes = () => {
    deleteUser(user.id)
    setDeleted(true)
    setOpen(false)
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
          <Button onClick={handleYes}>Yes</Button>
          <Button onClick={handleNo}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteUserButton
