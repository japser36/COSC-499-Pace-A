import Head from 'next/head'
import Link from 'next/link'

const sum = require('../../sum')

export default function Shamus() {
  return (
    <>
      <Head>
        <title>Shamus Dev Page</title>
      </Head>
      <h1>Shamus Dev Page</h1>
      <h2>{sum(2, 3)}</h2>
    </>
  )
}

//the following command is the only fix i could find for a recurring issue i have been having. I think this is an issue on my end only but idk for sure.
//yarn add @types/jest @types/node @types/react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react husky lint-staged prettier typescript jest ts-jest
