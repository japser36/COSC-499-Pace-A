import Head from 'next/head'
import { matchMentors } from '../../../utils/matching'
import fetch from 'node-fetch'
import Button from '@material-ui/core/Button'
import { getIFrame } from '../../../utils/misc'

export default function Shamus() {
  return (
    <>
      <Head>
        <title>Shamus Dev Page</title>
      </Head>
      <h1>Shamus Dev Page</h1>
      <iframe
        src="http://localhost:3000/i/GAxU0RtvWZUes6gKREFnMEzJmXi1"
        title="Mentee Registration"
        height="600"
        width="800"
      />
    </>
  )
}
//test
//the following command is the only fix i could find for a recurring issue i have been having. I think this is an issue on my end only but idk for sure.
//yarn add @types/jest @types/node @types/react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react husky lint-staged prettier typescript jest ts-jest node-mocks-http cross-env
