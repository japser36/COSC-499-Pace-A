import { Button, Typography, CircularProgress } from '@material-ui/core'
import { useState } from 'react'
import { matchMentors } from '../../utils/matching'

const MatchMentorsButton = ({ mentee_id }) => {
  const [loading, setLoading] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleClick = () => {
    setLoading(true)
    matchMentors(mentee_id)
      .then((matched) => {
        setClicked(true)
        setSuccess(matched.length > 0)
        setLoading(false)
      })
      .catch((error) => {
        setClicked(false)
        setLoading(false)
        console.log(error)
      })
  }

  return (
    <>
      {clicked ? (
        <>
          {success ? (
            <Typography>{`Match successful. Please wait to be accepted.`}</Typography>
          ) : (
            <Typography>{`No match found. Please contact your administrator or wait for new mentors to sign up.`}</Typography>
          )}
        </>
      ) : (
        <Button variant='outlined' onClick={handleClick}>
          {`Click here to match with a mentor.`}
          {loading && <CircularProgress />}
        </Button>
      )}
    </>
  )
}

export default MatchMentorsButton
