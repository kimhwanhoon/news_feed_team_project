import React, { useState, useEffect} from "react";
import { styled } from "styled-components";
//import heartImg from '/assets'
//import emptyHeartImg from '../assets/heart.png'

const Heart=styled.img`
    width:30px;
    height:30px;
`
const HeartBtn = ({ like, onClick }) => {
    return (
      <>
        <Heart src={like ? '../assets/heart (1).png' : '../assets/heart.png'} onClick={onClick} />
      </>
    );
  };

  export default HeartBtn;

  
//const HeartBtn = () => {
    //const [isLiked, setIsLiked] = useState(false);
    //const [likeCount, setLikeCount] = useState(0);
  
   // const handleLikeClick = () => {
      //setIsLiked(!isLiked);
      //setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    //};
    //return (
        //<>
        //<Heart src={isLiked?heartImg:emptyHeartImg } onClick={handleLikeClick}/>
        //</>

   // );
//;

