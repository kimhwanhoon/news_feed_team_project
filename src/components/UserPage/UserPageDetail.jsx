import React from 'react';
import { styled } from 'styled-components';

function UserPageDetail() {
  return (
    <StyledDiv>
      <h1>Account details</h1>
      <div id="profile-detail-container">
        <ProfilePageDetailPhotoContainer />
        <ProfilePageDetailInputContainer />
        <div id="profile-page-button-container">
          <button id="profile-page-edit-button">Edit</button>
          <button id="profile-page-save-button">Save</button>
        </div>
      </div>
    </StyledDiv>
  );
}

export default UserPageDetail;

const ProfilePageDetailPhotoContainer = () => {
  return (
    <div id="profile-page-detail-container">
      <div id="profile-page-detail-photo-div">
        <div>
          <img src="img/profile.png" alt="profile pic" />
        </div>
        <div id="profile-page-photo-detail-div">
          <h2>Avatar</h2>
          <p>600x600 or larger recommended</p>
          <button>Upload new</button>
        </div>
      </div>
    </div>
  );
};

const ProfilePageDetailInputContainer = () => {
  return (
    <div id="profile-page-detail-input-container">
      <h3>Personal details</h3>
      <div className="profile-page-detail-input-con">
        <div className="profile-page-detail-input-div">
          <label htmlFor="first name">First name</label>
          <input type="text" name="first name" />
        </div>
        <div className="profile-page-detail-input-div">
          <label htmlFor="last name">Last name</label>
          <input type="text" name="last name" />
        </div>
      </div>
      <div className="profile-page-detail-input-con">
        <div className="profile-page-detail-input-div">
          <label htmlFor="Email Address">Email address</label>
          <input type="text" name="Email Address" readOnly />
        </div>

        <div className="profile-page-detail-input-div">
          <label htmlFor="Phone Number">Phone number</label>
          <input type="text" name="Phone Number" />
        </div>
      </div>

      <div className="profile-page-detail-input-con">
        <div className="profile-page-detail-input-div">
          <label htmlFor="Address">Address</label>
          <input type="text" name="Address" />
        </div>

        <div className="profile-page-detail-input-div">
          <label htmlFor="zip code">Zip code</label>
          <input type="text" name="zip code" />
        </div>
      </div>
      <div className="profile-page-detail-input-con">
        <div className="profile-page-detail-input-div">
          <label htmlFor="city town">City/Town</label>
          <input type="text" name="city town" />
        </div>
      </div>
    </div>
  );
};

// style
const StyledDiv = styled.div`
  width: 100%;
  max-width: 800px;
  h1 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1.6rem;
  }
  #profile-detail-container {
    background-color: white;

    box-shadow: 1px 1px 3px 0 #abc;
  }

  #profile-page-detail-photo-div {
    display: flex;
    gap: 2rem;
    padding: 2rem 2.5rem;
  }

  #profile-page-detail-photo-div img {
    width: 80px;
  }
  #profile-page-photo-detail-div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  #profile-page-photo-detail-div h2 {
    font-size: 1.2rem;
    font-weight: 700;
  }
  #profile-page-photo-detail-div p {
    font-size: 0.9rem;
    font-weight: 600;
    color: #777;
  }
  #profile-page-photo-detail-div button {
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    width: 120px;
    padding: 10px 10px;
    border: none;
    border-radius: 100px;
    background-color: #5196fe;
    cursor: pointer;
  }
  //

  #profile-page-detail-input-container {
    padding: 0 2rem 2rem 2rem;
  }
  #profile-page-detail-input-container h3 {
    font-size: 1.15rem;
    font-weight: 600;
    padding-bottom: 1rem;
  }
  //
  .profile-page-detail-input-con {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
  }
  .profile-page-detail-input-con input {
    width: 50%;
  }
  .profile-page-detail-input-div {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 200px;
  }
  .profile-page-detail-input-div label {
    color: #888;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .profile-page-detail-input-div input {
    width: 100%;
    padding: 0.5rem 0.5rem;
    box-shadow: 0 0 2px 0 #aaa;
    border: none;
    outline: black;
  }
  .profile-page-detail-input-div input:focus {
    outline: black 1px solid;
  }
  //
  #profile-page-button-container {
    height: 5rem;
    display: flex;
    justify-content: flex-end;
    padding: 0 2rem 2rem;
    gap: 1rem;
  }
  #profile-page-button-container button {
    width: 100px;
    border: none;
    box-shadow: 0 0 2px 0 #aaa;
    background-color: #fff;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
  }
  #profile-page-button-container button:hover {
    box-shadow: 0 0 2px 0 #aaa;
    background-color: #5196fe;
    color: white;
  }
`;
