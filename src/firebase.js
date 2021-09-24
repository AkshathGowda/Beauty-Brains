import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAgPJ0i1zVIbmCWt873H_xIOptEOLDN9nY",
    authDomain: "ourgram-20f11.firebaseapp.com",
    databaseURL: "https://ourgram-20f11-default-rtdb.firebaseio.com",
    projectId: "ourgram-20f11",
    storageBucket: "ourgram-20f11.appspot.com",
    messagingSenderId: "194153642108",
    appId: "1:194153642108:web:9273a5095c9575a42ff1f9"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();