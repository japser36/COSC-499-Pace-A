// Based on https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/pages/index.js
import Link from 'next/link'
import { useUser } from '../../lib/auth/useUser'
import Layout from '../../components/layout'

export default function LoggedIn() {
    const { user, logout } = useUser()

    return (
        <Layout title="Auth Landing">
            {user ? (
                <>
                    <h4>You are signed in!</h4>
                    <p>-Details-</p>
                    <p>UID: {user.uid}</p>
                    <p>Email: {user.email}</p>
                    <p>Name: {user.displayName}</p>
                    <p>EmailVerified: {user.emailVerified ? 'true' : 'false'}</p>
                </>
            ) : (
                <p>You are not signed in.</p>
            )}
        </Layout>
    )
}
