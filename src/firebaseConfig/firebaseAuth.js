import { login$outToggle, loginOnClickHandler, signupOnClickHandler } from 'components/Header';
import { initializeApp } from 'firebase/app';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { loginSucess } from 'redux/modules/isLoginSuccess';
import {
  deleteUserDataBySignout,
  saveUserDataWithEmail,
  saveUserDataWithSocial,
  signupUserDataUpdate
} from 'redux/modules/user';

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
    dispatch(loginSucess());
    login$outToggle();
    loginOnClickHandler();
    // 유저의 닉네임이 없으면 이메일로 내보내기
    alert(`Welcome, ${userCredential.user.displayName ?? userCredential.user.email}!`);
    document.getElementById('modal-login-email-input').value = '';
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
      login$outToggle();
      socialLoginGreetingUser(additionalUserInfo);
      socialLoginSuccessHandler();
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
      login$outToggle();
      socialLoginGreetingUser(additionalUserInfo);
      socialLoginSuccessHandler();
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
      login$outToggle();
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

// 회원가입하기
export const signingUp = (dispatch, email, password, confirmPassword) => {
  if (password !== confirmPassword) {
    alert('비밀번호가 다릅니다. 다시 확인해주세요.');
    return;
  } else if (password.length < 8) {
    alert('비밀번호는 8자리 이상으로 만들어주세요.');
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      login$outToggle();
      signupOnClickHandler();
      dispatch(signupUserDataUpdate(user));
      alert(`회원가입 완료!\n환영합니다. ${user.email}`);
      // ...
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-email') {
        alert(`메일 주소를 다시 확인해주세요.`);
        return;
      } else if (error.code === 'auth/email-already-in-use') {
        alert(`이미 가입되어있는 메일입니다.`);
        return;
      }
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorDetails = [errorCode, errorMessage];
      console.log(errorDetails);
      // ..
    });
};

// Social 로그인 성공 시 모달 닫기
const socialLoginSuccessHandler = () => {
  if (!document.getElementById('login-modal').classList.contains('hidden')) {
    document.getElementById('login-modal').classList.toggle('hidden');
  } else {
    document.getElementById('signup-modal').classList.toggle('hidden');
  }
};

// Social 로그인 성공 시 환영 메세지 보내기
const socialLoginGreetingUser = (additionalUserInfo) => {
  if (additionalUserInfo.isNewUser) {
    alert(`Thank you for joining us, ${additionalUserInfo.profile.name ?? additionalUserInfo.profile.email}!`);
  } else {
    alert(`Welcome back, ${additionalUserInfo.profile.name ?? additionalUserInfo.profile.email}!`);
  }
};
