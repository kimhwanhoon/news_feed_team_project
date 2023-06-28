import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import LoginModal from './auth/Login';
import SignUpModal from './auth/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, loggedInUserCheck } from 'firebaseConfig/firebaseAuth';
import { fetchUserDate } from 'redux/modules/user';

function Header() {
  const dispatch = useDispatch();
  // 유저가 로그인 되어있는지 확인하여 새로고침해도 로그아웃이 되지 않게 설정
  useEffect(() => {
    loggedInUserCheck()
      .then((userData) => {
        if (!userData) {
          return;
        } else {
          login$outToggle();
          dispatch(fetchUserDate(userData));
        }
      })
      .catch((error) => {
        console.log('Error fetching user:', error);
      });
  }, [dispatch]);

  // store에서 userdata를 구독하여
  // 나중에 dispatch로 userdata가 변경되면 재랜더링을 되게 한다.
  const subscribedUserData = useSelector((state) => {
    return state.userData;
  });
  return (
    <>
      <StyledHeader>
        <h1>Logo</h1>
        <div id="header-right-div">
          <div id="header-button-div">
            <button id="header-login-button" onClick={loginOnClickHandler}>
              log in
            </button>
            <button id="header-logout-button" className="hidden" onClick={() => logOut(dispatch)}>
              log out
            </button>
          </div>
          <div id="header-profile-div">
            <img
              alt=""
              id="profile-image"
              src={
                // subscribedUserData.~ : loggedInUserCheck()에서 가져온 userData
                // subscribedUserData.profile.picture: Google
                // subscribedUserData.profile.avatar_url: Github
                // 맨 처음 로드시 아무런 정보가 없기 때문에 옵셔널 체이닝(?.)을 사용하여 에러를 예방
                subscribedUserData?.photoURL ??
                subscribedUserData?.profile?.picture ??
                subscribedUserData?.profile?.avatar_url ??
                'img/profile.png'
              }
            />
            <p id="header-profile-signin">
              {
                // subscribedUserData.~ : loggedInUserCheck()에서 가져온 userData
                // subscribedUserData.user: Google
                // subscribedUserData.profile: Github
                // 맨 처음 로드시 아무런 정보가 없기 때문에 옵셔널 체이닝(?.)을 사용하여 에러를 예방
                subscribedUserData?.displayName ??
                  subscribedUserData?.email ??
                  subscribedUserData?.user?.displayName ??
                  subscribedUserData?.profile?.name ??
                  subscribedUserData?.profile?.email ??
                  subscribedUserData?.user?.email ??
                  'Not signed in'
              }
            </p>
            <Link to="/profile">프로필</Link> {/* 프로필 페이지로 이동하는 링크 */}
          </div>
        </div>
      </StyledHeader>

      <LoginModal />
      <SignUpModal />
    </>
  );
}

export default Header;
export const loginOnClickHandler = (e) => {
  if (!document.getElementById('login-modal').classList.contains('hidden') && e.target.id === 'header-login-button') {
    return;
  }
  document.getElementById('login-modal').classList.toggle('hidden');
};
export const signupOnClickHandler = () => {
  document.getElementById('signup-modal').classList.toggle('hidden');
};

export const login$outToggle = () => {
  document.getElementById('header-login-button').classList.toggle('hidden');
  document.getElementById('header-logout-button').classList.toggle('hidden');
};

const StyledHeader = styled.header`
  height: 100px;
  border-bottom: 1px black solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lavenderblush;
  #header-right-div {
    display: flex;
    gap: 1rem;
  }
  #header-profile-div {
    display: flex;
    gap: 0.25rem;
    flex-direction: column;
    align-items: center;
    margin-right: 2rem;
  }
  #profile-image {
    width: 50px;
    border-radius: 100%;
    margin-bottom: 0.25rem;
  }
  h1 {
    margin-left: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }
  #header-button-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #header-button-div button {
    background-color: whitesmoke;
    border: none;
    box-shadow: 0 0 5px 0px #999;
    border-radius: 8px;
    padding: 0.3rem 0.75rem;
    font-weight: 600;
    color: #333;
    cursor: pointer;
  }
`;
