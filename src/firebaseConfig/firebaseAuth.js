import { onSuccessfulHandler } from 'components/auth/Login';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider
} from 'firebase/auth';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export const loginEmailPassword = async (emailValue, passwordValue, dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
    onSuccessfulHandler();
    dispatch({ type: 'login with email and password.', payload: userCredential.user.email });
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
      alert(`We cannot find user email with ${emailValue}`);
    }
  }
};

export const signupEmailPassword = async (emailValue, passwordValue) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
    onSuccessfulHandler();
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
      alert(`We cannot find user email with ${emailValue}`);
    }
  }
};

// GOOGLE

export const loginWithGoogle = async (dispatch) => {
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
      onSuccessfulHandler();
      dispatch({ type: 'google', payload: detail });
    })
    .catch((error) => {
      console.log(error);
    });
};

// Github
export const loginWithGithub = (dispatch) => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const detail = getAdditionalUserInfo(result);
      console.log(token, user, detail);
      onSuccessfulHandler();
      dispatch({ type: 'github', payload: detail });
    })
    .catch((error) => {
      console.log(error);
    });
};

// Home에서 사용자가 로그인 했는지 확인하기
export const loggedInUserCheck = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        // user is signed out.
        resolve(null);
      }
    });
  });
};

// 로그아웃 처리 하기
export const logout = async (dispatch) => {
  await signOut(auth);
  dispatch({ type: 'logout' });
  alert('User logged out!');
};
