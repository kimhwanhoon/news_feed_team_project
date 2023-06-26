//게시글 클릭시 모달창
import React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import HeartBtn from "./Heart";

//modal을 구현하는데 전체적으로 필요한 css
export const ModalContainer = styled.div` 
    display:flex;
    justify-content : center;
    align-items : center;
    height: 100%;
    background: white;

`;
export const DetailModal=styled.div`
  font-size:50px;
  border-radius:10px;
  border: 1px solid lightgray;
  background-color: white;
  z-index:2;
  width:600px;
  height:400px

`
//Modal이 떴을 때의 배경을 깔아주는 css
export const ModalBackdrop = styled.div `
    z-index:1; 
    position:fixed;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: rgba(0,0,0,0.4);
    top:0;
    left:0;
    right:0;
    bottom:0;
`;

export const DetailTitle=styled.p`
    font-size:20px;
    padding:20px;
`

export const DetailBox=styled.div`
    border: 1px solid lightgray;
    width: 500px;
    height:300px;
    font-size:30px;
`

//ModalBtn(상세보기) , ExitBtn(이전으로)/ 배경 누르면 이전으로



export const Modal =() => {
        const[isOpen,setIsOpen] = useState(false);
        const [isLiked, setIsLiked] = useState(false); //초기값 false
        
        const openModalHandler = () => {
        //isOpen의 상태를 변경하는 메소드
            setIsOpen(!isOpen)
    };
        const handleLikeClick = () => {
            setIsLiked(!isLiked);
      };
        return(
         <>
            <button onClick={openModalHandler}>상세보기</button>

            {isOpen && (
                <ModalContainer>
                <DetailModal>
                <DetailTitle>nickname</DetailTitle>
                <detailBox></detailBox>
                <HeartBtn like={isLiked} onClick={handleLikeClick} />
                <button onClick={openModalHandler}>close</button>
                </DetailModal>
                <ModalBackdrop onClick={openModalHandler}/>
                </ModalContainer>
            )}

            
        </>
        );
};

export default Modal;

