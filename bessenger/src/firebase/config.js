import Firebase from 'firebase'

const firebaseConfig = {
   apiKey: 'AIzaSyDJzFMr9Yy9-AxYFjGgc6gNsf-ucF0lZCc',
   databaseUrl: 'https://bessenger-6ca0e-default-rtdb.firebaseio.com/',
   projectId: 'bessenger-6ca0e',
   appId: '1:802324438967:android:5923b175cbc17a04f2d232',
}

export default Firebase.initializeApp(firebaseConfig)