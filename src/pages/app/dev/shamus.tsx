import Head from 'next/head'
import { matchMentors } from '../../../utils/matching'
import fetch from 'node-fetch'
import Button from '@material-ui/core/Button'

export default function Shamus() {
  const NotifyOfMatch = () => {
    fetch('/api/sendmail/notifyofmatch', {
      method: 'POST',
      body: JSON.stringify({
        mentee_id: 'MENTEE1',
        mentor_id: 'MxSFrMRCggPNEOrdcrIZkQ85Fk63',
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
      <Button variant="contained" onClick={NotifyOfMatch}>
        Send Matched Notification
      </Button>
    </>
  )
}
//test
//the following command is the only fix i could find for a recurring issue i have been having. I think this is an issue on my end only but idk for sure.
//yarn add @types/jest @types/node @types/react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react husky lint-staged prettier typescript jest ts-jest node-mocks-http cross-env
