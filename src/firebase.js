import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyB2M5vnjP6NMbV9OumlAWmOX98RVUBXzh8",
  authDomain: "football-website-99227.firebaseapp.com",
  databaseURL: "https://football-website-99227.firebaseio.com",
  projectId: "football-website-99227",
  storageBucket: "football-website-99227.appspot.com",
  messagingSenderId: "1079996165408"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');

export {
  firebase,
  firebaseMatches,
  firebasePromotions
}