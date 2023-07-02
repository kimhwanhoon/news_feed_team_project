import React, { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import Modal from '../shared/detail';
import { useSelector } from 'react-redux';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


const FeedItem = ({ feed, setFeeds }) => {
  const user = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateFeed = async () => {
    const newFeedText = prompt('수정 내용 입력:', feed.text);

    if (newFeedText) {
      const feedRef = await addDoc(collection(db, 'feeds'), {
        text: newFeedText,
        createdAt: serverTimestamp(),
        authorName: user.name,  // 작성자 이름 저장
        authorProfileImage: user.profileImage,  // 작성자의 프로필 사진 URL을 저장
      });
      setFeeds((prev) => {
        return prev.map((element) => {
          if (element.id === feed.id) {
            return { ...element, text: newFeedText };
          } else {
            return element;
          }
        });
      });
    }
  };

  const deleteFeed = async () => {
    const feedRef = doc(db, 'feeds', feed.id);
    await deleteDoc(feedRef);

    setFeeds((prev) => {
      return prev.filter((element) => element.id !== feed.id);
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppContainer>
      {isModalOpen && <Modal closeModal={closeModal} text={feed.text} isOpen={isModalOpen} />}
      <StyledFeed onClick={openModal}>
        <DeleteButtonWrapper>
          <button onClick={updateFeed}>수정</button>
          <DeleteButton onClick={deleteFeed}>삭제</DeleteButton>
        </DeleteButtonWrapper>
        <StyledTextWrapper>
          <StyledText>{feed.text}</StyledText>
          <AuthorInfo>
            <AuthorName>{user ? user.name : ''}</AuthorName>
            {user && user.photoURL && <AuthorImage src={user.photoURL} />}
          </AuthorInfo>
        </StyledTextWrapper>
      </StyledFeed>
    </AppContainer>
  );
};

const StyledFeed = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  margin: 10px;
  width: 300px;
  height: 100px;
  overflow: hidden;
  cursor: pointer;
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledText = styled.div`
  white-space: nowrap;
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: -1px;
  right: -1px;
`;

const DeleteButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorName = styled.span`
  margin-right: 10px;
`;

const AuthorImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export default FeedItem;
