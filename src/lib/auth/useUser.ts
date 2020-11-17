// Based on https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/utils/auth/useUser.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import { getFirebaseAuth } from '../firebase'
import { FirebaseAuth } from 'react-firebaseui'

const useUser = () => {
    const [user, setUser] = useState<firebase.User>()
    const router = useRouter()

    const logout = () => {
        return getFirebaseAuth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                console.log('Signed out successfully.')
                router.push('/')
            })
            .catch((e) => {
                console.error(e)
            })
    }

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        const cancelAuthListener = getFirebaseAuth().onIdTokenChanged(async (user) => {
            if (user) {
                // user still signed in
                setUser(user)
            } else {
                // user is not signed in anymore
                setUser(undefined)
            }
        })

        return () => {
            cancelAuthListener()
        }
    }, [])

    return { user, logout }
}

export { useUser }
