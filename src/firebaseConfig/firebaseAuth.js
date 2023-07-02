import { login$outToggle, signupOnClickHandler } from 'components/Header';
import { toggleForgotPasswordModal } from 'components/auth/ForgotPassword';
import { initializeApp } from 'firebase/app';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { sentMailSucess } from 'redux/modules/forgotMailSent';
import { loginSucess, logoutSucess } from 'redux/modules/isLoginSuccess';
import {
  deleteUserDataBySignout,
  saveUserDataWithEmail,
  saveUserDataWithSocial,
  signupUserDataUpdate
} from 'redux/modules/user';

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
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// email과 password로 로그인
export const loginWithEmailPassword = async (email, password, dispatch) => {
  
  const loginEmail = email;
  const loginPassword = password;
  const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  console.log(userCredential);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    // dispatch로 store에 유저정보 업데이트하기
    dispatch(saveUserDataWithEmail(userCredential));
    dispatch(loginSucess());
    login$outToggle();
    loginSuccessCloseModal();
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
      const additionalUserInfo = getAdditionalUserInfo(result);
      // dispatch로 store에 유저정보 업데이트하기
      dispatch(saveUserDataWithSocial(additionalUserInfo));
      login$outToggle();
      socialLoginGreetingUser(additionalUserInfo);
      loginSuccessCloseModal();
    })
    .catch((error) => {
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      const errorDetail = [
        { 'error code': error.code },
        { 'error message': error.message },
        { email: error.customData.email },
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
      const additionalUserInfo = getAdditionalUserInfo(result);
      // dispatch로 store에 유저정보 업데이트하기
      dispatch(saveUserDataWithSocial(additionalUserInfo));
      login$outToggle();
      socialLoginGreetingUser(additionalUserInfo);
      loginSuccessCloseModal();
    })
    .catch((error) => {
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
      const errorDetail = [
        { 'error code': error.code },
        { 'error message': error.message },
        { email: error.customData.email },
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
      dispatch(logoutSucess());
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
  if (email === '') {
    alert('이메일 주소를 입력해주세요.');
    return;
  }
  if (password !== confirmPassword) {
    alert('비밀번호가 다릅니다. 다시 확인해주세요.');
    return;
  }
  if (password.length < 8) {
    alert('비밀번호는 8자리 이상으로 만들어주세요.');
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      login$outToggle();
      signupOnClickHandler();
      dispatch(signupUserDataUpdate(user));
      dispatch(loginSucess());
      alert(`회원가입 완료!\n환영합니다. ${user.email}`);
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-email') {
        alert(`메일 주소를 다시 확인해주세요.`);
        return;
      }
      if (error.code === 'auth/email-already-in-use') {
        alert(`이미 가입되어있는 메일입니다.`);
        return;
      }
      if (error.code === 'auth/weak-password') {
        alert(`비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용해주세요.`);
        return;
      }
      const errorDetails = [error.code, error.message];
      console.log(errorDetails);
    });
};

// 로그인 성공 시 모달 닫기
const loginSuccessCloseModal = () => {
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

// Forgot password => 비밀번호 재설정 이메일 보내기
export const sendResetPasswordMail = (email, dispatch) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('이메일 발송완료!\n이메일 수신함을 확인해주세요.');
      toggleForgotPasswordModal();
      dispatch(sentMailSucess());
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        alert(`등록된 계정이 아닙니다.`);
        return;
      }
      if (error.code === 'auth/missing-email') {
        alert(`이메일 주소를 입력해주세요.`);
        return;
      }
      const errorDetail = [error.code, error.message];
      console.log(errorDetail);
    });
};

export default app;