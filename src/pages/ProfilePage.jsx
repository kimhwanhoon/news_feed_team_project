import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { fetchUserData } from 'redux/modules/user';
import { useDispatch } from 'react-redux';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);

  useEffect(()=> {
    dispatch(fetchUserData());
  },[dispatch])
    
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [jobHobby, setJobHobby] = useState('');
  const [introduction, setIntroduction] = useState('');

  const handleProfileImageChange = (event) => {
    const imageFile = event.target.files[0];
    setProfileImage(URL.createObjectURL(imageFile));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleJobHobbyChange = (event) => {
    setJobHobby(event.target.value);
  };

  const handleIntroductionChange = (event) => {
    setIntroduction(event.target.value);
  };

  const handleSave = () => {
    const userData = { name, jobHobby, introduction, profileImage };
    dispatch(fetchUserData(userData))
    .then(() => toast.success('저장이 완료되었습니다.'))
    .catch((error) => toast.error('저장 중 오류가 발생했습니다.'));
};

  const myPosts = [
    { id: 1, title: '첫 번째 글', textcontent: '내가 쓴 첫 번째 글입니다.' },
    { id: 2, title: '두 번째 글', textcontent: '내가 쓴 두 번째 글입니다.' },
    { id: 3, title: '세 번째 글', textcontent: '내가 쓴 세 번째 글입니다.' }
  ];

  const user = useSelector((state) => state.userData);
  useEffect(() => {
    if (user) {
      setName(user.name);
      setJobHobby(user.jobHobby);
      setIntroduction(user.introduction);
      setProfileImage(user.profileImage);
    }
  }, [user]); // user가 변경될 때마다 프로필 정보를 업데이트합니다.

  return (
    <Container>
      <h1>Welcome, {user.name}</h1>
      <LeftSection>
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} alt="프로필 사진" />
          <ProfileImageInput type="file" accept="image/*" onChange={handleProfileImageChange} />
        </ProfileImageWrapper>
        <TextInput type="text" placeholder="이름" value={name} onChange={handleNameChange} />
        <TextInput type="text" placeholder="직업/취미" value={jobHobby} onChange={handleJobHobbyChange} />
        <TextareaInput placeholder="소개" value={introduction} onChange={handleIntroductionChange} />
        <SaveButton onClick={handleSave}>저장</SaveButton>
      </LeftSection>

      <RightSection>
        <h2>내가 쓴 글</h2>
        <PostList>
          {myPosts.map((post) => (
            <PostItem key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.textcontent}</p>
            </PostItem>
          ))}
        </PostList>
      </RightSection>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-left: 150px;
  margin-top: 100px;
  padding: 100px;
  padding-top: 1px;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: 200px;
`;

const ProfileImageWrapper = styled.label`
  display: inline-block;
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 80px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const TextInput = styled.input`
  width: 300px;
  height: 40px;
  padding: 8px;
  margin-top: 16px;
  font-size: 16px;
`;

const TextareaInput = styled.textarea`
  width: 300px;
  height: 120px;
  padding: 8px;
  margin-top: 16px;
  font-size: 16px;
  resize: none;
`;

const RightSection = styled.div`
  width: 600px;
  position: sticky;
  top: 100px; /* 원하는 위치로 조정해주세요 */
`;

const PostList = styled.div`
  margin-top: 20px;
`;

const PostItem = styled.div`
  margin-bottom: 10px;
`;

const SaveButton = styled.button`
  width: 100px;
  height: 40px;
  margin-top: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

export default ProfilePage;