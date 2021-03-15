import firebaseClient from 'firebase/app'
import 'firebase/auth'

if (!firebaseClient.apps.length) {
  firebaseClient.initializeApp({
    apiKey: 'AIzaSyD_dqC9nk4_hq5GLXauoRuAr92SeUW9ees',
    authDomain: 'cosc499-pace-a.firebaseapp.com',
    databaseURL: 'https://cosc499-pace-a.firebaseio.com',
    projectId: 'cosc499-pace-a',
    storageBucket: 'cosc499-pace-a.appspot.com',
    messagingSenderId: '9643136081',
    appId: '1:9643136081:web:d11c6c486524e393f1d470',
    measurementId: 'G-RFW1NNCPMF',
  });
  //firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
}

export { firebaseClient };