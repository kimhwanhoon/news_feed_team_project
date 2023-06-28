import React, { useEffect } from 'react';
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
          dispatch({ type: 'default' });
        } else {
          console.log('userdata', userData);
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
    console.log('subscribedUserData의 state:', state);
    return state.userData;
  });
  console.log('subscribedUserData: ', subscribedUserData);
  return (
    <>
      <StyledHeader>
        <h1>Logo</h1>
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
          <p>
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
        </div>
      </StyledHeader>
      <div>
        <button onClick={loginOnClickHandler}>log in</button>
        <button onClick={() => logOut(dispatch)}>log out</button>
      </div>
      <LoginModal />
      <SignUpModal />
    </>
  );
}

export default Header;

const StyledHeader = styled.header`
  height: 100px;
  border-bottom: 1px black solid;
  display: flex;
  justify-content: space-between;
  align-items: center;

  #header-profile-div {
    margin-right: 2rem;
    display: flex;
    gap: 0.25rem;
    flex-direction: column;
    align-items: center;
  }
  #profile-image {
    width: 50px;
    border-radius: 100%;
  }
`;

const loginOnClickHandler = () => {
  document.getElementById('login-modal').classList.toggle('hidden');
};
