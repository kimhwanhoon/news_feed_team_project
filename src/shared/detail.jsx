//-----------------게시글 클릭시 나오는 모달창--------------------
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import HeartBtn from 'modal/Heart';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebase';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(firebaseConfig.apiKey);
console.log(app.name);

//---------style-component-------------------
//-----모달창-----
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;
//모달창 내부
export const DetailModal = styled.div`
  font-size: 50px;
  border-radius: 10px;
  border: 1px solid lightgray;
  background-color: white;
  z-index: 2;
  width: 600px;
  height: 400px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
`;
//모달창 상단의 작성자 정보:DetailTitle
export const User = styled.img`
  width: 40px;
  height: 40px;
`;
export const DetailTitle = styled.p`
  font-size: 20px;
  padding-left: 20px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;
export const CloseBtn = styled.button``;

export const DetailBox = styled.div`
  border: 1px solid lightgray;
  width: 550px;
  height: 250px;
  font-size: 20px;
  margin-left: 10px;
  padding: 10px;
  grid-row: 2;
  grid-column: 1;
  overflow: auto;
  ${props =>
    props.scrollable &&
    css`
      max-height: 250px;
    `}
`;


//Modal 뒤 배경
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 1;
`;


export const Modal = ({ closeModal, text, isOpen }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  //좋아요 하트 버튼

  useEffect(async () => {
    const fetchData = async () => {
      const res = await axios.get('/api/data');
      if (res.data.type === 'liked') setIsLiked(true)
    }
    fetchData()
  }, []);
  
  const handleLikeClick = async (e) => {
    const res = await axios.post('/api/like', { postId: 123 }); // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    setIsLiked(!isLiked)
  }


  //배경 누르는 이벤트

  const handleBackdropClick = () => {
    closeModal();
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <>
          <ModalContainer>
            <ModalBackdrop onClick={handleBackdropClick} />
            <DetailModal>
              <DetailTitle>
                <User src={'../img/user (1).png'} />
                nickname
              </DetailTitle>
              <DetailBox scrollable>{text}</DetailBox>
              <ButtonContainer>
                <HeartBtn initialLike={isLiked} onClick={handleLikeClick} />
                <button onClick={handleBackdropClick}>닫기</button>
              </ButtonContainer>
            </DetailModal>
          </ModalContainer>
        </>
      )}
    </>
  );

};

export default Modal;
