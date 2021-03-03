import Firebase from 'firebase'

const firebaseConfig = {
   apiKey: '',
   databaseUrl: '',
   projectId: '',
   appId: '',
}

export default Firebase.initializeApp(firebaseConfig)