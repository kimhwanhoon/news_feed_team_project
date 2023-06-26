import { loginEmailPassword, loginWithGithub, loginWithGoogle } from 'firebaseConfig/firebaseAuth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export const openLoginModal = () => {
  const modalContainer = document.getElementById('login-modal');
  modalContainer.classList.toggle('hidden');
  modalContainer.classList.toggle('show');
};

const inputOnChangeHandler = (e, setFn) => {
  setFn(e.target.value);
};
//

function LoginModal() {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  return (
    <section id="login-modal" className="modal-container hidden">
      <div className="modal">
        <div className="modal-h-container">
          <h1 className="modal-welcome-h1">Welcome back!</h1>
          <h2 className="modal-welcome-h2">Please log in.</h2>
        </div>
        <div className="modal-input-container">
          <input
            className="input text"
            type="email"
            value={emailValue}
            onChange={(e) => inputOnChangeHandler(e, setEmailValue)}
            placeholder="you@example.com"
          />
          <input
            className="input text"
            type="password"
            value={passwordValue}
            onChange={(e) => inputOnChangeHandler(e, setPasswordValue)}
            placeholder="Password"
          />
          <span id="forgot-password">Forgot password?</span>
          <input
            id="modal-login-button"
            type="button"
            className="input modal-button"
            value="Login"
            onClick={() => loginEmailPassword(emailValue, passwordValue, dispatch)}
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
            <span id="modal-sign-up-suggestion" onClick={signUpOnClickHandler}>
              Sign Up
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default LoginModal;

const signUpOnClickHandler = () => {
  const loginModal = document.getElementById('login-modal');
  const signUpModal = document.getElementById('signup-modal');
  loginModal.classList.toggle('show');
  loginModal.classList.toggle('hidden');
  signUpModal.classList.toggle('show');
  signUpModal.classList.toggle('hidden');
};

export const onSuccessfulHandler = () => {
  const loginModal = document.getElementById('login-modal');
  const signUpModal = document.getElementById('signup-modal');

  if (loginModal.classList.contains('show')) {
    loginModal.classList.toggle('hidden');
    loginModal.classList.toggle('show');
  } else if (signUpModal.classList.contains('show')) {
    signUpModal.classList.toggle('hidden');
    signUpModal.classList.toggle('show');
  }
};
