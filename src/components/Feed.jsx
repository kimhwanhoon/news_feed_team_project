import React, { useEffect, useState } from 'react';
import FeedItem from './FeedItem';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';

const Feed = () => {
  const [feeds, setFeeds] = useState([]);

  const [text, setText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'feeds'));
      const querySnapshot = await getDocs(q);

      const initialFeeds = [];

      querySnapshot.forEach((doc) => {
        initialFeeds.push({ id: doc.id, ...doc.data() });
      });

      setFeeds(initialFeeds);
    };

    fetchData();
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'text') {
      setText(value);
    }
  };

  const addFeed = async (event) => {
    event.preventDefault();
    const newFeed = { text: text };

    const collectionRef = collection(db, 'feeds');
    const { id } = await addDoc(collectionRef, newFeed);

    setFeeds((prev) => {
      return [...feeds, { ...newFeed, id }];
    });
    setText('');
  };

  return (
    <div>
      <StyledBtn>
        <button>New feed</button>
      </StyledBtn>
      <form style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <label>newFeed(임시): </label>
          <input type="text" value={text} name="text" onChange={onChange} required />
          <button onClick={addFeed}>추가</button>
        </div>
      </form>

      <div>
        {feeds
          .filter((feed) => !feed.isDone)
          .map((feed) => {
            return <FeedItem key={feed.id} feeds={feeds} feed={feed} setFeeds={setFeeds} />;
          })}
      </div>
    </div>
  );
};

const StyledBtn = styled.div`
  display: flex;
  justify-content: center;
`;
export default Feed;
