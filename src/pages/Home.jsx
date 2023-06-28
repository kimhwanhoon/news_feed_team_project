import React from 'react';
import MyPage from './ProfilePage';

const MyPageButton = () => {
  const [showMyPage, setShowMyPage] = React.useState(false);

  const handleShowMyPage = () => {
    setShowMyPage(true);
  };

  return (
    <div>
      <button onClick={handleShowMyPage}>마이페이지</button>
      {showMyPage && <MyPage />}
    </div>
  );
};

export default MyPageButton;
