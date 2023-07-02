import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFeed } from './feeds';
import { v4 as uuid } from 'uuid'; // UUID 생성을 위해 'uuid' 모듈에서 v4 함수를 임포트

const WriteComponent = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleWriteClick = () => {
    if (isLoggedIn) {
      const newFeed = {
        id: uuid(), // UUID 생성
        body: input,
      };
      dispatch(addFeed(newFeed));
      setInput('');
    } else {
      alert('로그인이 필요한 서비스입니다.');
      // 로그인 액션 디스패치
      dispatch(loginAction());
    }
  };

  return (
    <div>
      
      <textarea onChange={handleInputChange} value={input} />
      <button onClick={handleWriteClick}>글쓰기</button>
    </div>
  );
};

export default WriteComponent;
