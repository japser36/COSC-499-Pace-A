import { useContext, createContext, useState, useEffect } from 'react';
import { firebaseClient } from './firebaseClient'
import nookies from 'nookies'
import { useRouter } from 'next/router'

const AuthContext = createContext<{ user: firebaseClient.User | null }>({
  user: null
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<firebaseClient.User | null>(null);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' })
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, { path: '/' })
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const router = useRouter()
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

  return {
    user: useContext(AuthContext).user,
    logout: logout
  }
}