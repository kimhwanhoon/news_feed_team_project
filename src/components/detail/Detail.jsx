//게시글 클릭시 모달창
import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import userImg from '../../assets/user (1).png';
import css from 'styled-components';
import HeartBtn from './Heart';

//modal을 구현하는데 전체적으로 필요한 css
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
export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;
export const CloseBtn = styled.button``;

//Modal이 떴을 때의 배경을 깔아주는 css
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 9998;
`;

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
  ${(props) =>
    props.scrollable && //스크롤바 생성
    css`
      max-height: 250px;
    `}
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
//ModalBtn(상세보기) , ExitBtn(이전으로)/ 배경 누르면 이전으로
// export const UserImg = () => {
//   return (
//     <>
//       <User src={userImg} />
//     </>
//   );
// };

export const Modal = ({ closeModal, text, isOpen }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  // useEffect(() => {
  //   setIsOpen(true);
  // }, []);

  const closeAndResetModal = () => {
    // setIsOpen(false);
    setIsLiked(false);
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <ModalContainer>
          <DetailModal>
            <DetailTitle>
              <User src={require('../../assets/user (1).png').default} />
              nickname
            </DetailTitle>
            <DetailBox scrollable>{text}</DetailBox>
            <ButtonContainer>
              <HeartBtn like={isLiked} onClick={handleLikeClick} />
              <button onClick={closeAndResetModal}>닫기</button>
            </ButtonContainer>
          </DetailModal>
          <ModalBackdrop onClick={closeAndResetModal} />
        </ModalContainer>
      )}
    </>
  );
};

export default Modal;
