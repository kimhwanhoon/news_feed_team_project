import LoginModal, { openLoginModal } from 'components/auth/Login';
import SignUpModal from 'components/auth/SignUp';
import React from 'react';
function Home() {
  return (
    <>
      <div>
        <h1>Home</h1>
        <h2>메인 페이지</h2>
      </div>
      <div>
        <h1>Log in 버튼 구현</h1>
        <button onClick={openLoginModal}>Login</button>
      </div>
      <LoginModal />
      <SignUpModal />
    </>
  );
}

export default Home;
