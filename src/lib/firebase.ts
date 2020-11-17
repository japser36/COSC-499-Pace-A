import firebase from 'firebase/app'
import 'firebase/auth'

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyD_dqC9nk4_hq5GLXauoRuAr92SeUW9ees',
    authDomain: 'cosc499-pace-a.firebaseapp.com',
    databaseURL: 'https://cosc499-pace-a.firebaseio.com',
    projectId: 'cosc499-pace-a',
    storageBucket: 'cosc499-pace-a.appspot.com',
    messagingSenderId: '9643136081',
    appId: '1:9643136081:web:d11c6c486524e393f1d470',
    measurementId: 'G-RFW1NNCPMF',
}

const initFirebase = () => {
    // ensure only one instance of firebase running at once.
    if (!firebase.apps.length) {
        return firebase.initializeApp(firebaseConfig)
    }
    // return existing instance
    return firebase.apps[0]
}

// get the firebase instance, return the auth instance
export const getFirebaseAuth = () => initFirebase().auth()
