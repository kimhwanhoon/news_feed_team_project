import { loginOnClickHandler, signupOnClickHandler } from 'components/Header';
import { loginWithEmailPassword, loginWithGithub, loginWithGoogle } from 'firebaseConfig/firebaseAuth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ForgotPassword, { toggleForgotPasswordModal } from './ForgotPassword';
import { setUser } from 'redux/config/actions';
import { loginSucess } from 'redux/modules/isLoginSuccess';

const inputOnChangeHandler = (e, setFn) => {
  setFn(e.target.value);
};

function LoginModal({onclose}) {
  //
  const dispatch = useDispatch();
  //
  const login = async (loginFn, ...args) => {
    const userInfo = await loginFn(...args);
    dispatch(loginSucess()); 
    dispatch(setUser(userInfo));
  };
  

  const isLoginSuccess = useSelector((state) => {
    return state.isLoginSuccess.loginSuccess;
  });
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  useEffect(() => {
    if (isLoginSuccess) {
      setEmailValue('');
      setPasswordValue('');
    }
  }, [isLoginSuccess]);



  return (
    <>
      <section id="login-modal" className="modal-container hidden">
        <div className="modal">
          <button onClick={onclose} className="close-button">
            &times;
          </button>
          <div className="modal-h-container">
            <h1 className="modal-welcome-h1">Welcome back!</h1>
            <h2 className="modal-welcome-h2">Please log in.</h2>
          </div>
          <div className="modal-input-container">
            <input
              className="input text"
              id="modal-login-email-input"
              type="email"
              value={emailValue}
              onChange={(e) => inputOnChangeHandler(e, setEmailValue)}
              placeholder="you@example.com"
            />
            <input
              className="input text"
              id="modal-login-password-input"
              type="password"
              value={passwordValue}
              onChange={(e) => inputOnChangeHandler(e, setPasswordValue)}
              placeholder="Password"
            />
            <span id="forgot-password" onClick={toggleForgotPasswordModal}>
              Forgot password?
            </span>
            <input
              id="modal-login-button"
              type="button"
              className="input modal-button"
              value="Login"
              onClick={() => loginWithEmailPassword(emailValue, passwordValue, dispatch)}
            />
          </div>
          <div className="modal-divider">
            <div></div>
            <span>or sign in with</span>
            <div></div>
          </div>
          <div className="modal-social-icon-container">
            <button onClick={() => loginWithGoogle(dispatch)}>
              <img src="img/Google.png" alt="Google icon" />
              Google
            </button>
            <button onClick={() => loginWithGithub(dispatch)}>
              <img src="img/github.png" alt="github icon" />
              Github
            </button>
          </div>
          <div className="modal-last-suggestion-container">
            <h3 id="modal-last-text">
              Don't you have an account?{' '}
              <span id="modal-sign-up-suggestion" onClick={signupOnClickHandler}>
                Sign Up
              </span>
            </h3>
          </div>
        </div>
      </section>
      <ForgotPassword />
    </>
  );
}

export default LoginModal;