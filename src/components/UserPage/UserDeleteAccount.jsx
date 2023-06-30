import React from 'react';
import { styled } from 'styled-components';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { deleteUserAccount } from 'firebaseConfig/firebaseAuth';

function UserDeleteAccount() {
  return (
    <StyledDiv>
      <div className="profile-detail-container">
        <div className="profile-page-detail-container">
          <DangerousIcon style={{ color: 'red' }} />
          <h3 id="delete-account-warning" className="profile-detail-my-email-subtitle" style={{ color: 'red' }}>
            Delete your account will permanently delete your account.
          </h3>
          <p>Are you sure you want to delete your account?</p>
          <button onClick={deleteUserAccount}>Change password</button>
        </div>
      </div>
    </StyledDiv>
  );
}

export default UserDeleteAccount;

// style
const StyledDiv = styled.div`
  .profile-detail-my-email-subtitle {
    padding-top: 3rem;
  }
  .profile-page-detail-input-div {
    position: relative;
  }
  .profile-page-detail-input-div p:hover {
    font-weight: 600;
  }
  .profile-page-detail-input-div button {
    margin-top: 2rem;
    border: none;
    padding: 10px;
    box-shadow: 1px 1px 5px -1px #649ffe;
    background-color: white;
    color: #333;
    border-radius: 10px;
    font-size: 0.9rem;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    cursor: pointer;
  }

  .profile-page-detail-input-div button:hover {
    transform: scale(1.03);
    color: white;
    background-color: #649ffe;
  }
  #user-page-verify-email-button {
    margin-top: 1rem;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    box-shadow: 1px 1px 5px -1px #649ffe;
    background-color: #fff;
    cursor: pointer;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
  }
  #user-page-verify-email-button:hover {
    transform: scale(1.03);
    color: white;
    background-color: #022a03;
  }
  p {
    line-height: 1.75;
    font-weight: 700;
  }

  //
  svg {
    margin-top: 3rem;
    margin-bottom: 0.25rem;
  }

  #delete-account-warning {
    padding-top: 0.25rem;
  }

  button {
    margin-top: 0.5rem;
    padding: 5px 20px;
    border: none;
    box-shadow: 1px 1px 2px 0 #ff4c33;

    border-radius: 8px;
    cursor: pointer;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid red;
    color: #fff;
    background-color: #ff4c33;
  }
  button:hover {
    background-color: #fff;
    color: #022a03;
    box-shadow: 1px 1px 2px 0 #222;
    border: 1px transparent solid;
  }
`;
