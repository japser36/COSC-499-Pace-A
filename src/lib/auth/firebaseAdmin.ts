import * as firebaseAdmin from 'firebase-admin'

// get this JSON from the Firebase board
// you can also store the values in environment variables
import serviceAccount from '../../../cosc499-pace-a-firebase-adminsdk-xf52l-e7dad0e75f.json'

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: 'https://cosc499-pace-a.firebaseio.com',
  })
}

export { firebaseAdmin }