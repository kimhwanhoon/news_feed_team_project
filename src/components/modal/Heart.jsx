import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';

const Heart = styled.img`
  width: 30px;
  height: 30px;
`;
const HeartBtn = ({ initialLike, onClick }) => {
  const [like, setLike] = useState(initialLike);

  const handleLikeClick = () => {
    setLike(!like);
    onClick(!like);
  };
  return (
    <>
      <Heart src={like ? '../assets/heart (1).png' : '../assets/heart.png'} onClick={handleLikeClick} />
    </>
  );
};

export default HeartBtn;
