import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider
} from 'firebase/auth';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export const loginEmailPassword = async (emailValue, passwordValue) => {
  const loginEmail = emailValue;
  const loginPassword = passwordValue;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    alert(`Welcome, ${userCredential.user.email}`);
    // console.log(userCredential);
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      alert('invalid email. Please check your email.');
    } else if (error.code === 'auth/wrong-password') {
      alert('The password is not correct.');
    } else if (error.code === 'auth/missing-password') {
      alert('Please type your password.');
    } else if (error.code === 'auth/email-already-in-use') {
      alert('The email is already registered!');
    } else if (error.code === 'auth/user-not-found') {
      alert(`We cannot find user email with ${loginEmail}`);
    }
  }
};

export const signupEmailPassword = async (emailValue, passwordValue) => {
  const loginEmail = emailValue;
  const loginPassword = passwordValue;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
    alert(`Successfully registered! \nEmail: ${userCredential.user.email}`);
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      alert('invalid email. Please check your email.');
    } else if (error.code === 'auth/wrong-password') {
      alert('The password is not correct.');
    } else if (error.code === 'auth/missing-password') {
      alert('Please type your password.');
    } else if (error.code === 'auth/email-already-in-use') {
      alert('The email is already registered!');
    } else if (error.code === 'auth/user-not-found') {
      alert(`We cannot find user email with ${loginEmail}`);
    }
  }
};

// GOOGLE

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      const detail = getAdditionalUserInfo(result);
      console.log(token, user, detail);
      alert(`Welcome, ${user.displayName}!`);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode, errorMessage, email, credential);
    });
};

// Facebook
export const loginWithFacebook = () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      const detail = getAdditionalUserInfo(result);
      console.log(accessToken, user, detail);
      alert(`Welcome, ${user.displayName}!`);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
      // ...
    });
};
