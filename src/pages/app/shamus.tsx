import Head from 'next/head'
import { matchMentors } from '../../utils/matching'
import fetch from 'node-fetch'
import Button from '@material-ui/core/Button'
import PendingMatches from '../../components/PendingMatches'

export default function Shamus() {
  const sendInvite = () => {
    fetch('/api/sendmail/invitementor', {
      method: 'POST',
      body: JSON.stringify({
        recipient: 'shamusboulianne@gmail.com',
        org_id: 'TESTORG1',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const NotifyOfMatch = () => {
    fetch('/api/sendmail/notifyofmatch', {
      method: 'POST',
      body: JSON.stringify({
        mentee_id: 'DeBFR9YirCgB2SaLhB6lNBVE4lK2',
        mentor_id: '87225EYB2SR3Q1nbu2pDGQ1FsVP2',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <>
      <Head>
        <title>Shamus Dev Page</title>
      </Head>
      <h1>Shamus Dev Page</h1>
      <Button variant="contained" onClick={sendInvite}>
        Send Invite Email
      </Button>
      <Button variant="contained" onClick={NotifyOfMatch}>
        Send Matched Notification
      </Button>
      <PendingMatches mentor_id="MENTOR1" />
    </>
  )
}
//test
//the following command is the only fix i could find for a recurring issue i have been having. I think this is an issue on my end only but idk for sure.
//yarn add @types/jest @types/node @types/react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react husky lint-staged prettier typescript jest ts-jest node-mocks-http cross-env
