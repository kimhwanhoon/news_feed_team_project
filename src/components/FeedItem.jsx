//components/TodoItem.js
import React from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';

const FeedItem = ({ feeds, feed, setFeeds }) => {
  const updateFeed = async (event) => {
    const feedRef = doc(db, 'feeds', feed.id);
    await updateDoc(feedRef, { ...feed, isDone: !feed.isDone });

    setFeeds((prev) => {
      return prev.map((element) => {
        if (element.id === feed.id) {
          return { ...element, isDone: !element.isDone };
        } else {
          return element;
        }
      });
    });
  };

  const deleteFeed = async (event) => {
    const feedRef = doc(db, 'feeds', feed.id);
    await deleteDoc(feedRef);

    setFeeds((prev) => {
      return prev.filter((element) => element.id !== feed.id);
    });
  };

  return (
    <StyledFeed>
      <div key={feed.id}>
        <span>{feed.text}</span>
        {/* <button onClick={updateFeed}>{feed.isDone ? '취소' : '완료'}</button> */}
        <button onClick={deleteFeed}>삭제</button>
      </div>
    </StyledFeed>
  );
};

const StyledFeed = styled.div`
  display: flex;
  justify-content: center;
`;
export default FeedItem;
