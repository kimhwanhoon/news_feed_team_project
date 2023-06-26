import LoginModal, { openLoginModal } from 'components/auth/Login';
import SignUpModal from 'components/auth/SignUp';
import { loggedInUserCheck, logout } from 'firebaseConfig/firebaseAuth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => {
    return state.reduxUser;
  });
  const dispatch = useDispatch();

  loggedInUserCheck()
    .then((userData) => {
      if (!userData) {
        dispatch({ type: 'default' });
        return;
      }
      dispatch({ type: 'fetch user data', payload: userData });
    })
    .catch((error) => {
      console.log('Error fetching user:', error);
    });

  return (
    <>
      <div>
        <h1>Home</h1>
        <h2>USER</h2>
        <h3>로그인 되어있으면 아래 정보 보여주기</h3>
        {user && <p>{user}</p>}
      </div>
      <div>
        <h1>Log in 버튼 구현</h1>
        <button onClick={openLoginModal}>Log in</button>
        <button onClick={() => logout(dispatch)}>Log out</button>
      </div>
      <LoginModal />
      <SignUpModal />
    </>
  );
}

export default Home;
