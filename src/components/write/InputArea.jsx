import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';

const InputArea = ({ selectedOption, closeModal }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const changeEnteredNum = (e) => {
    const value = e.target.value;
    const removedCommaValue = value;
    setContent(removedCommaValue.toLocaleString());
  };

  const dispatch = useDispatch();

  const 저장하기 = (title, content) => {
    console.log(title);
    console.log(content);
    console.log(selectedOption);

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
        <br />
        <StBT>저장</StBT>
        <StBT onClick={closeModal}>닫기</StBT>
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
  border: hidden 3px;
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
  border: hidden 3px;
`;

const StBT = styled.button`
  font-size: 14px;
  line-height: 1em;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
  pointer-events: auto;
  border: none;
  white-space: nowrap;
  transition: all 0.1s ease-out 0s;
  color: whitesmoke;
  background-color: #5353ef;
  overflow: hidden;
  touch-action: none;
  margin-right: 4px;
  float: right;
`;
