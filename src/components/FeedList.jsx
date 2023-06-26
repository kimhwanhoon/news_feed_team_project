import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { removeFeed } from 'redux/modules/\bfeeds';
import { useNavigate } from 'react-router-dom';

function FeedList() {
  const feeds = useSelector((state) => state.feeds);

  if (!feeds) {
    return null;
  }
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleDeleteButtonClick = (id) => {
  //   dispatch(removeFeed(id));
  // };
  return (
    <StyledListBox>
      {feeds.map((item) => {
        return (
          <StyledFeedBox key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </StyledFeedBox>
        );
      })}
    </StyledListBox>
  );
}

const StyledListBox = styled.div`
  background-color: #20201f;
  padding: 20px;
`;

const StyledFeedBox = styled.div`
  background-color: #060606;
  color: white;
  padding: 10px;
  margin: 5px;
`;

export default FeedList;
