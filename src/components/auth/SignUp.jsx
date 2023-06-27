import { loginWithGithub, loginWithGoogle, signupEmailPassword } from 'firebaseConfig/firebaseAuth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionTypes } from 'redux/modules/user';
const inputOnChangeHandler = (e, setFn) => {
  setFn(e.target.value);
};

const signUpClickHandler = (
  emailValue,
  passwordValue,
  confirmPasswordValue,
  dispatch,
  setEmailValue,
  setPasswordValue,
  setConfirmPasswordValue
) => {
  if (passwordValue.length >= 8) {
    if (passwordValue === confirmPasswordValue) {
      signupEmailPassword(emailValue, passwordValue);
      setEmailValue('');
      setPasswordValue('');
      setConfirmPasswordValue('');
      dispatch({ type: actionTypes.SIGNUP, payload: emailValue });
    } else {
      alert('Please confirm your password again.');
    }
  } else {
    alert('Password should be at least 8 characters.');
  }
};

function SignUpModal() {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  return (
    <section id="signup-modal" className="modal-container hidden">
      <div className="modal">
        <div className="modal-h-container">
          <h1 className="modal-welcome-h1">Sign Up</h1>
          <h2 className="modal-welcome-h2">Please sign up to our website.</h2>
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
            placeholder="At least 8 characters"
          />
          <input
            className="input text"
            type="password"
            value={confirmPasswordValue}
            onChange={(e) => inputOnChangeHandler(e, setConfirmPasswordValue)}
            placeholder="Confirm password"
          />

          <input
            id="modal-signup-button"
            type="button"
            className="input modal-button"
            value="Sign Up"
            onClick={() =>
              signUpClickHandler(
                emailValue,
                passwordValue,
                confirmPasswordValue,
                dispatch,
                setEmailValue,
                setPasswordValue,
                setConfirmPasswordValue
              )
            }
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
            You already have account?{' '}
            <span onClick={signInOnClickHandler} id="modal-sign-up-suggestion">
              Sign In
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default SignUpModal;

const signInOnClickHandler = () => {
  document.getElementById('login-modal').classList.toggle('show');
  document.getElementById('login-modal').classList.toggle('hidden');
  document.getElementById('signup-modal').classList.toggle('show');
  document.getElementById('signup-modal').classList.toggle('hidden');
};
