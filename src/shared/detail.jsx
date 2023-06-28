//게시글 클릭시 모달창
import React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import HeartBtn from "../modal/Heart";
//import userImg from "../assets/user (1).png"
import css from "styled-components";



//modal을 구현하는데 전체적으로 필요한 css
export const ModalContainer = styled.div` 
    display:flex;
    justify-content : center;
    align-items : center;
    height: 100%;
    background: white;

`;
//모달창 내부
export const DetailModal=styled.div`
  font-size:50px;
  border-radius:10px;
  border: 1px solid lightgray;
  background-color: white;
  z-index:2;
  width:600px;
  height:400px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;

`
export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  

`;
export const closeBtn=styled.button`

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



export const DetailBox=styled.div`
    border: 1px solid lightgray;
    width: 550px;
    height:250px;
    font-size:20px;
    margin-left:10px;
    padding:10px;
    grid-row: 2;
    grid-column: 1;
    overflow:auto;    
    ${props =>
        props.scrollable &&        //스크롤바 생성
        css`
          max-height: 250px;
        `}
    
`

//모달창 상단의 작성자 정보:DetailTitle
export const User=styled.img`
   width:40px;
   height:40px;
`
export const DetailTitle=styled.p`
    font-size:20px;
    padding-left:20px;
`
//ModalBtn(상세보기) , ExitBtn(이전으로)/ 배경 누르면 이전으로
export const UserImg=()=>{
    return(
        <>
        <User src={'../assets/user (1).png'}/>
        </>
    )
    }
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
            <button  onClick={openModalHandler}>더보기</button>

            {isOpen && (
                <ModalContainer>
                <DetailModal>
                <DetailTitle><UserImg/>nickname</DetailTitle>
                <DetailBox scrollable>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, a sequi! Id fugiat ratione quaerat quia pariatur perspiciatis commodi error sit vel ipsam nihil ea accusantium cupiditate quibusdam, doloribus Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam architecto quas rerum sunt, officiis neque, aut quasi porro saepe, laboriosam provident iure praesentium doloremque cupiditate facilis cumque eligendi! Odit,Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quam sit, sunt harum alias error repellendus neque repellat rem nemo quod nobis velit impedit aut non voluptate possimus laudantium doloremque?;</DetailBox>
                <ButtonContainer>
                <HeartBtn like={isLiked} onClick={handleLikeClick} />
                <button onClick={openModalHandler}>close</button>
                </ButtonContainer>
                </DetailModal>
                <ModalBackdrop onClick={openModalHandler}/>
                </ModalContainer>
            )}

            
        </>
        );
};

export default Modal;

