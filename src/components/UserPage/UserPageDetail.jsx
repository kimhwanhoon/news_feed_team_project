import { fetchUserPageInfo, uploadPhoto, useAuth, userInfoUpdate } from 'firebaseConfig/firebaseAuth';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUserPageInputDisabled } from 'redux/modules/userPageInputToggler';
import { styled } from 'styled-components';

function UserPageDetail() {
  const userData = useSelector((state) => {
    return state.userData;
  });
  console.log('userData', userData);

  return (
    <StyledDiv>
      <h1>Account details</h1>
      <div id="profile-detail-container">
        <ProfilePageDetailPhotoContainer userData={userData} />
        <ProfilePageDetailInputContainer userData={userData} />
      </div>
    </StyledDiv>
  );
}

export default UserPageDetail;

const ProfilePageDetailPhotoContainer = ({ userData }) => {
  const [photoURLValue, setPhotoURLValue] = useState('');
  const fileInputRef = useRef(null);

  const currentUser = useAuth();
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURLValue(currentUser.photoURL);
    } else {
      setPhotoURLValue('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png');
    }
  }, [currentUser]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  //
  const handleFileChange = (e) => {
    const photo = e.target.files[0];
    setPhoto(photo);
    // object이다.
    const reader = new FileReader();
    reader.onload = () => {
      const uploadedPhotoURL = reader.result;
      setPhotoURLValue(uploadedPhotoURL);
    };
    const isImage = photo.type.startsWith('image/');
    if (!isImage) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      fileInputRef.current.value = null;
      return;
    }
    if (photo) {
      reader.readAsDataURL(photo);
    }
  };
  const handleClick = () => {
    uploadPhoto(photo, currentUser, setLoading);
  };
  return (
    <div id="profile-page-detail-container">
      <div id="profile-page-detail-photo-div">
        <div>
          <img src={photoURLValue} alt="profile pic" />
        </div>
        <div id="profile-page-photo-detail-div">
          <h2>{userData?.displayName ?? userData?.user?.displayName ?? 'Username not set'}</h2>
          <p>600x600 or larger recommended</p>
          <input ref={fileInputRef} disabled={loading} type="file" onChange={(e) => handleFileChange(e)} />
          <button disabled={loading || !photo} onClick={() => handleClick()}>
            Upload new
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfilePageDetailInputContainer = ({ userData }) => {
  // redux에서 input disabled toggle 변경
  const dispatch = useDispatch();
  // Redux input disabled toggler 상태 구독
  const isDisabled = useSelector((state) => {
    return state.userPageInputToggler.TOGGLE;
  });
  //
  const [CombinedUserData, setCombinedUserData] = useState(null);
  // fetch user data from fireStore
  const currentUser = useAuth();
  useEffect(() => {
    if (currentUser) {
      fetchUserPageInfo(currentUser, setCombinedUserData);
    }
  }, [currentUser]);
  console.log('CombinedUserData', CombinedUserData);

  const [displayNameValue, setDisplayNameValue] = useState('');
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneNumberValue, setPhoneNumberValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [zipcodeValue, setZipcodeValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  //
  useEffect(() => {
    setDisplayNameValue(userData?.displayName ?? '');
    setFirstNameValue(CombinedUserData?.firstName ?? '');
    setLastNameValue(CombinedUserData?.lastName ?? '');
    setEmailValue(userData?.email ?? userData?.user?.email ?? '');
    setPhoneNumberValue(userData?.phoneNumber ?? '');
    setAddressValue(CombinedUserData?.address ?? '');
    setZipcodeValue(CombinedUserData?.zipCode ?? '');
    setCityValue(CombinedUserData?.city ?? '');
  }, [userData, CombinedUserData]);
  const setFunction = (e, setFn) => {
    setFn(e.target.value);
  };

  return (
    <>
      <div id="profile-page-detail-input-container">
        <h3>Personal details</h3>
        {/*  */}
        <div className="profile-page-detail-input-con">
          <div className="profile-page-detail-input-div">
            <label htmlFor="display name">Display name</label>
            <input
              type="text"
              name="display name"
              disabled={isDisabled}
              value={displayNameValue}
              onChange={(e) => setFunction(e, setDisplayNameValue)}
            />
          </div>
        </div>
        {/*  */}
        <div className="profile-page-detail-input-con">
          <div className="profile-page-detail-input-div">
            <label htmlFor="first name">First name</label>
            <input
              type="text"
              name="first name"
              disabled={isDisabled}
              value={firstNameValue}
              onChange={(e) => setFunction(e, setFirstNameValue)}
            />
          </div>
          <div className="profile-page-detail-input-div">
            <label htmlFor="last name">Last name</label>
            <input
              type="text"
              name="last name"
              disabled={isDisabled}
              value={lastNameValue}
              onChange={(e) => setFunction(e, setLastNameValue)}
            />
          </div>
        </div>
        <div className="profile-page-detail-input-con">
          <div className="profile-page-detail-input-div">
            <label htmlFor="Email Address">Email address</label>
            <input
              type="text"
              name="Email Address"
              // disabled={isDisabled}
              disabled={true}
              onChange={(e) => setFunction(e, setEmailValue)}
              value={emailValue}
            />
          </div>

          <div className="profile-page-detail-input-div">
            <label htmlFor="Phone Number">Phone number</label>
            <input
              type="text"
              name="Phone Number"
              // disabled={isDisabled}
              disabled={true}
              value={phoneNumberValue}
              onChange={(e) => setFunction(e, setPhoneNumberValue)}
            />
          </div>
        </div>

        <div className="profile-page-detail-input-con">
          <div className="profile-page-detail-input-div">
            <label htmlFor="Address">Address</label>
            <input
              type="text"
              name="Address"
              disabled={isDisabled}
              value={addressValue}
              onChange={(e) => setFunction(e, setAddressValue)}
            />
          </div>

          <div className="profile-page-detail-input-div">
            <label htmlFor="zip code">Zip code</label>
            <input
              type="text"
              name="zip code"
              disabled={isDisabled}
              value={zipcodeValue}
              onChange={(e) => setFunction(e, setZipcodeValue)}
            />
          </div>
        </div>
        <div className="profile-page-detail-input-con">
          <div className="profile-page-detail-input-div">
            <label htmlFor="city town">City/Town</label>
            <input
              type="text"
              name="city town"
              disabled={isDisabled}
              value={cityValue}
              onChange={(e) => setFunction(e, setCityValue)}
            />
          </div>
        </div>
      </div>
      <div id="profile-page-button-container">
        <button id="profile-page-edit-button" onClick={() => dispatch(toggleUserPageInputDisabled())}>
          Edit
        </button>
        <button
          id="profile-page-save-button"
          onClick={() => {
            userInfoUpdate(displayNameValue, firstNameValue, lastNameValue, addressValue, zipcodeValue, cityValue);
          }}
        >
          Save
        </button>
      </div>
    </>
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
    width: 100px;
    height: 100px;
    border-radius: 100px;
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
  #profile-page-photo-detail-div button:disabled {
    background-color: #3176cc;
    color: #aaa;
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
