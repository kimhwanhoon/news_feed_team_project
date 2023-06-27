import { loggedInUserCheck, logout } from 'firebaseConfig/firebaseAuth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { styled } from 'styled-components';
import { openLoginModal } from './auth/Login';
import { actionTypes } from 'redux/modules/user';

function Header() {
  const dispatch = useDispatch();

  useEffect(() => {
    loggedInUserCheck()
      .then((userData) => {
        if (!userData) {
          dispatch({ type: 'default' });
        } else {
          dispatch({ type: actionTypes.FETCH_USER, payload: userData });
        }
      })
      .catch((error) => {
        console.log('Error fetching user:', error);
      });
  }, [dispatch]);

  const userNameOrEmail = useSelector((state) => {
    console.log('rendering check');
    console.log(state.reduxUser.displayName);
    const reduxUser = state.reduxUser;
    if (reduxUser && reduxUser.displayName) {
      return reduxUser.displayName;
    } else if (reduxUser && reduxUser.email) {
      return reduxUser.email;
    } else {
      return 'Anonymous User';
    }
  });

  const userProfile = useSelector((state) => {
    const reduxUser = state.reduxUser;
    if (reduxUser && reduxUser.photoURL) {
      return reduxUser.photoURL;
    } else {
      return 'img/profile.png';
    }
  });

  return (
    <StyledHeader>
      <div>
        <h1>Logo</h1>
      </div>
      <button id="home-log-in-button" onClick={openLoginModal}>
        Log in
      </button>
      <button id="home-log-out-button" className="hidden" onClick={() => logout(dispatch)}>
        Log out
      </button>
      <div id="profile-container">
        <p>{userNameOrEmail}</p>
        <img src={userProfile} alt="profile" />
      </div>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  box-shadow: 0 0 5px 0 #999;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  align-items: center;
  margin-bottom: 2rem;
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #008888;
  }
  #profile-container {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  #profile-container img {
    width: 50px;
    border-radius: 100px;
  }
`;
