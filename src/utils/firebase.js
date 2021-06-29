import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCjquWFc3reor8o9f2Qh4HcmvEjoDfr4Zc",
    authDomain: "uploaddemo-edfd1.firebaseapp.com",
    databaseURL: "https://uploaddemo-edfd1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "uploaddemo-edfd1",
    storageBucket: "uploaddemo-edfd1.appspot.com",
    messagingSenderId: "192147570496",
    appId: "1:192147570496:web:fb5294e3239c9fc75dc4a5",
    measurementId: "G-38HJN4G5X1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export{
    storage, firebase as default
}

