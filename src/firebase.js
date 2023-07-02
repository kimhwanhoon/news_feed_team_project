// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAG00FHecpm2cTz3zgTNa3txr5MUQ0tJDA',
  authDomain: 'newsfeed-cc49d.firebaseapp.com',
  projectId: 'newsfeed-cc49d',
  storageBucket: 'newsfeed-cc49d.appspot.com',
  messagingSenderId: '533615190194',
  appId: '1:533615190194:web:6d34340197080fb56b69ab'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export { firebaseConfig, app };