import Header from 'components/Header';
import LoginModal from 'components/auth/Login';
import SignUpModal from 'components/auth/SignUp';
import React from 'react';

function Home() {
  return (
    <>
      <Header />
      <div></div>
      <div></div>
      <LoginModal />
      <SignUpModal />
    </>
  );
}

export default Home;
