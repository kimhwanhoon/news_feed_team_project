import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { addFeed } from '../redux/modules/feeds';

function Input() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  const handleSubmitButtonClick = (e) => {
    e.preventDefault();

    const newFeed = {
      id: uuid(),
      title,
      body
    };

    dispatch(addFeed(newFeed));
    setTitle('');
    setBody('');
  };

  const handleTitleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyInputChange = (e) => {
    setBody(e.target.value);
  };

  return (
    <StyledInputBox>
      <form onSubmit={handleSubmitButtonClick}>
        <label>✒️ Writing a new feed</label>
        <input type="text" value={title} onChange={handleTitleInputChange} placeholder="Title" />
        <input value={body} onChange={handleBodyInputChange} placeholder="Body" />
        <button type="submit">Submit</button>
      </form>
    </StyledInputBox>
  );
}

const StyledInputBox = styled.div`
  background-color: #616464;
  padding: 20px;
`;

export default Input;
