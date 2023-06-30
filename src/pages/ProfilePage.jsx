import Header from 'components/Header';
import UserPageDetail from 'components/UserPage/UserPageDetail';
import UserPageMenu from 'components/UserPage/UserPageMenu';
import React from 'react';
import { styled } from 'styled-components';

function ProfilePage() {
  return (
    <>
      <Header />
      <StyledDiv>
        <div id="profile-page-title-div">
          <h1>Settings</h1>
          <div id="profile-page-divider"></div>
        </div>
        <div id="profile-page-component-container">
          <UserPageMenu />
          <UserPageDetail />
        </div>
      </StyledDiv>
    </>
  );
}

export default ProfilePage;

const StyledDiv = styled.div`
  background-color: #f0f0f0;
  height: calc(100vh - 80px);
  padding: 5rem 10%;
  #profile-page-title-div {
  }
  #profile-page-title-div h1 {
    font-size: 2.5rem;
    font-weight: 800;
  }
  #profile-page-divider {
    width: 100%;
    border-bottom: 2px #ddd solid;
    margin: 2rem 0;
  }
  #profile-page-component-container {
    display: flex;
    gap: 2rem;
    justify-content: center;
  }
`;
