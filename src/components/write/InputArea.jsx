import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';

const InputArea = ({ selectedOption }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const changeEnteredNum = (e) => {
    const value = e.target.value;
    const removedCommaValue = value;
    setContent(removedCommaValue.toLocaleString());
  };

  const dispatch = useDispatch();

  const 저장하기 = (title, content) => {
    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: uuid(),
        title,
        content,
        selectedOption,
        isDone: false
      }
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          저장하기(title, content);
          alert(`저장되었습니다`);
        }}
      >
        <div>
          <label></label>
          <StInput
            type="text"
            placeholder="제목
            "
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div>
          <label></label>
          <StInput2
            type="text"
            placeholder="내용"
            value={content}
            onChange={(e) => {
              changeEnteredNum(e);
            }}
          />
        </div>
        <button>저장</button>
      </form>
    </>
  );
};

export default InputArea;

const StInput = styled.input`
  border: 1px solid #333333;
  height: 20px;
  width: 400px;
  outline: none;
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  margin: 10px;
`;
const StInput2 = styled.input`
  border: 1px solid #333333;
  height: 100px;
  width: 400px;
  outline: none;
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  margin: 10px;
`;
