import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

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
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');

export {
  firebase,
  firebaseDB,
  firebaseTeams,
  firebaseMatches,
  firebasePlayers,
  firebasePromotions
}