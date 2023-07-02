import React, { useState } from "react";
import styled from "styled-components";
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { useEffect } from "react";


const Heart=styled.img`
    width:30px;
    height:30px;
`

const db = getFirestore();

const HeartBtn = ({ initialLike, onClick, setLike }) => {
  const [like, setInternalLike] = useState(initialLike);

  useEffect(() => {
    setInternalLike(initialLike);
  }, [initialLike]);

  const handleLikeClick = async () => {
    setInternalLike(!like);
    setLike && setLike(!like);
    onClick(!like);
  };
    return (
      <>
        <Heart src={like ? '../img/heart (1).png' : '../img/heart.png'} onClick={handleLikeClick} />
      </>
    );
  };

  export default HeartBtn;


