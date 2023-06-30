import { fetchUserPageInfo, useAuth, userInfoUpdate } from 'firebaseConfig/firebaseAuth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUserPageInputDisabled } from 'redux/modules/userPageInputToggler';
import { styled } from 'styled-components';

const ProfilePageDetailProfileContainer = ({ userData }) => {
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
    <StyledDiv>
      <div className="profile-page-detail-container">
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
    </StyledDiv>
  );
};

export default ProfilePageDetailProfileContainer;

const StyledDiv = styled.div`
  //

  .profile-page-detail-container {
    padding: 0 2rem 2rem 2rem;
  }
  .profile-page-detail-container h3 {
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
