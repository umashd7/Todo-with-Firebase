import firebase from 'firebase'


  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBUvS3DBPfwQfdo_j9q0MT63fzk4dhN8xM",
    authDomain: "todo-app-97bfa.firebaseapp.com",
    projectId: "todo-app-97bfa",
    storageBucket: "todo-app-97bfa.appspot.com",
    messagingSenderId: "527457574407",
    appId: "1:527457574407:web:145d526e18cc9e055e54a2",
    measurementId: "G-X63WK7WPZ7"
  });

  const db = firebaseApp.firestore()
export default db;