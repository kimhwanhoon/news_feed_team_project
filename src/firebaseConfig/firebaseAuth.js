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
import { handleToggleLoginButton, handleToggleLogoutButton } from 'redux/modules/loginLogoutToggle';
import {
  handleToggleForgotPasswordModal,
  handleToggleLoginModal,
  handleToggleSignupModal
} from 'redux/modules/loginModalToggler';
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
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // dispatch로 store에 유저정보 업데이트하기
    dispatch(saveUserDataWithEmail(userCredential));
    dispatch(loginSucess());
    // 로그인 성공 후 모달 닫기
    handleToggleLoginModal(dispatch);
    // 로그인 성공 후 로그인 버튼을 없애고, 로그아웃 버튼을 보이기
    handleToggleLoginButton(dispatch);
    handleToggleLogoutButton(dispatch);
    // 유저의 닉네임이 없으면 이메일로 환영 인사 내보내기
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
export const loginWithGoogle = (dispatch, e) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const additionalUserInfo = getAdditionalUserInfo(result);
      // dispatch로 store에 유저정보 업데이트하기
      dispatch(saveUserDataWithSocial(additionalUserInfo));
      socialLoginGreetingUser(additionalUserInfo);
      // 로그인 성공 후 모달 닫기, 로그인모달에서 로그인했으면 로그인 모달을 없애고, 회원가입모달에서 로그인 했으면 회원가입 모달을 없애기
      if (e.target.parentNode.parentNode.parentNode.id === 'login-modal') {
        handleToggleLoginModal(dispatch);
      } else {
        handleToggleSignupModal(dispatch);
      }
      // 로그인 성공 후 로그인 버튼을 없애고, 로그아웃 버튼을 보이기
      handleToggleLoginButton(dispatch);
      handleToggleLogoutButton(dispatch);
    })
    .catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
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
export const loginWithGithub = (dispatch, e) => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const additionalUserInfo = getAdditionalUserInfo(result);
      // dispatch로 store에 유저정보 업데이트하기
      dispatch(saveUserDataWithSocial(additionalUserInfo));
      socialLoginGreetingUser(additionalUserInfo);
      // 로그인 성공 후 모달 닫기, 로그인모달에서 로그인했으면 로그인 모달을 없애고, 회원가입모달에서 로그인 했으면 회원가입 모달을 없애기
      if (e.target.parentNode.parentNode.parentNode.id === 'login-modal') {
        handleToggleLoginModal(dispatch);
      } else {
        handleToggleSignupModal(dispatch);
      }
      // 로그인 성공 후 로그인 버튼을 없애고, 로그아웃 버튼을 보이기
      handleToggleLoginButton(dispatch);
      handleToggleLogoutButton(dispatch);
    })
    .catch((error) => {
      const credential = GithubAuthProvider.credentialFromError(error);
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
      // 로그아웃 후 로그인 버튼을 없애고, 로그아웃 버튼을 보이기
      handleToggleLoginButton(dispatch);
      handleToggleLogoutButton(dispatch);
      alert('안전하게 로그아웃되었습니다.');
    })
    .catch((error) => {
      console.log(error);
    });
};

// Home에서 사용자가 로그인 했는지 확인하기
export const loggedInUserCheck = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve(user);
        } else {
          // user is signed out.
          resolve(null);
        }
      },
      (error) => {
        reject('로그아웃 에러 발생', error);
      }
    );
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
      dispatch(signupUserDataUpdate(user));
      dispatch(loginSucess());
      alert(`회원가입 완료!\n환영합니다. ${user.email}`);
      // 회원가입후 모달 닫기
      handleToggleSignupModal(dispatch);
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
      dispatch(sentMailSucess());
      // 비밀번호 찾기 모달 닫기
      handleToggleForgotPasswordModal(dispatch);
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
