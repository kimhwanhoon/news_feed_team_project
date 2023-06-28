import { initializeApp } from 'firebase/app';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { deleteUserDataBySignout, saveUserDataWithEmail, saveUserDataWithSocial } from 'redux/modules/user';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// email과 password로 로그인
export const loginWithEmailPassword = async (email, password, dispatch) => {
  const loginEmail = email;
  const loginPassword = password;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    // dispatch로 store에 유저정보 업데이트하기
    dispatch(saveUserDataWithEmail(userCredential));
    // 유저의 닉네임이 없으면 이메일로 내보내기
    alert(`Welcome, ${userCredential.user.displayName ?? userCredential.user.email}!`);
    // 에러 핸들링
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      alert(`비밀번호가 틀렸습니다.`);
    } else if (error.code === 'auth/invalid-email') {
      alert(`이메일을 다시 확인해주세요.`);
    } else if (error.code === 'auth/user-not-found') {
      alert(`해당 계정이 존재하지 않습니다. 다시 확인해주세요.`);
    } else if (error.code === 'auth/missing-password') {
      alert(`비밀번호가 비어있습니다. 다시 입력해주세요.`);
    }
  }
};

// Google로 로그인
export const loginWithGoogle = (dispatch) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      //const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);
      // dispatch로 store에 유저정보 업데이트하기
      console.log('additionalUserInfo', additionalUserInfo);
      dispatch(saveUserDataWithSocial(additionalUserInfo));
      alert('로그인 완료!');
    })
    .catch((error) => {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      const errorDetail = [
        { 'error code': errorCode },
        { 'error message': errorMessage },
        { email: email },
        { credential: credential }
      ];
      console.log(errorDetail);
    });
};

// Github로 로그인
export const loginWithGithub = (dispatch) => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GithubAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);
      // dispatch로 store에 유저정보 업데이트하기
      console.log('additionalUserInfo', additionalUserInfo);
      dispatch(saveUserDataWithSocial(additionalUserInfo));
      alert('로그인 완료!');
    })
    .catch((error) => {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
      const errorDetail = [
        { 'error code': errorCode },
        { 'error message': errorMessage },
        { email: email },
        { credential: credential }
      ];
      console.log(errorDetail);
    });
};

// 로그아웃
export const logOut = (dispatch) => {
  signOut(auth)
    .then(() => {
      dispatch(deleteUserDataBySignout());
      alert('안전하게 로그아웃되었습니다.');
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
