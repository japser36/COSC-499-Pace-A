// Based on https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/utils/auth/useUser.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import { firebaseClient } from './firebaseClient'
import fetch from 'node-fetch'

const useUser = () => {
  const [user, setUser] = useState<firebase.User>()
  const [userType, setUserType] = useState('')
  const router = useRouter()

  const fetchAndSetUserType = async (id) => {
    await fetch(`/api/metauser/${id}`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setUserType(res.rows[0].usertype))
  }

  const logout = () => {
    return firebaseClient.auth()
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
    const cancelAuthListener = firebaseClient.auth().onIdTokenChanged(async (user) => {
      if (user) {
        // user still signed in
        setUser(user)
        fetchAndSetUserType(user.uid)
      } else {
        // user is not signed in anymore
        setUser(undefined)
      }
    })

    return () => {
      cancelAuthListener()
    }
  }, [])

  return { user, userType, logout }
}

export default useUser
