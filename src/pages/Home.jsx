import React from 'react';
import Header from 'components/Header';
import { styled } from 'styled-components';

// import MyPage from './ProfilePage';

// const MyPageButton = () => {
//   const [showMyPage, setShowMyPage] = React.useState(false);

//   const handleShowMyPage = () => {
//     setShowMyPage(true);
//   };
// };
// <button onClick={handleShowMyPage}>마이페이지</button>;
// {
//   showMyPage && <MyPage />;
// }

function Home() {
  return (
    <StyledHome>
      <Header />
      <div></div>
      <div></div>
    </StyledHome>
  );
}

export default Home;

const StyledHome = styled.div`
  height: 100vh;
  background-color: #999;
`;
