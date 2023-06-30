import React from 'react';
import { styled } from 'styled-components';

function UserPageMenu() {
  return (
    <StyledDiv>
      <div id="profile-page-menu-container">
        <div className="profile-page-menu">
          <img src="" alt="" />
          <h2>Profile</h2>
        </div>
        <div className="profile-page-menu">
          <img src="" alt="" />
          <h2>Subscription & billing</h2>
        </div>
        <div className="profile-page-menu">
          <img src="" alt="" />
          <h2>Password</h2>
        </div>
        <div className="profile-page-menu">
          <img src="" alt="" />
          <h2>Notifications</h2>
        </div>
        <div className="profile-page-menu">
          <img src="" alt="" />
          <h2>My Archive</h2>
        </div>
      </div>
    </StyledDiv>
  );
}

export default UserPageMenu;

const StyledDiv = styled.div`
  margin-top: 3rem;
  min-width: 220px;
  height: 50vh;
  #profile-page-menu-container {
    box-shadow: 1px 1px 3px 0 #abc;
    background-color: #fff;
  }
  .profile-page-menu {
    height: 40px;
    display: flex;
    padding: 0 1rem;
    align-items: center;
    cursor: pointer;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    border-radius: 12px;
  }
  .profile-page-menu:hover {
    background-color: #fafaea;
  }
  .profile-page-menu h2 {
    color: #5f5f5f;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }
  .profile-page-menu:nth-child(1) h2 {
    color: #d64229;
  }
`;
