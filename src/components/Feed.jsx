import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import FeedItem from './FeedItem';

const Feed = ({ searchValue }) => {
  const [text, setText] = useState('');
  const [feeds, setFeeds] = useState([]);

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

    // Subscribe to real-time updates for the feeds collection
    const unsubscribe = onSnapshot(collection(db, 'feeds'), (snapshot) => {
      const updatedFeeds = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFeeds(updatedFeeds);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'text') {
      setText(value);
    }
  };

  const addFeed = async (event) => {
    event.preventDefault();
    const newFeed = { text: text };

    const collectionRef = collection(db, 'feeds');
    await addDoc(collectionRef, newFeed);

    setText('');
  };

  const filteredFeeds = feeds.filter((feed) => feed.text.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div>
      <StyledBtn>
        <button>New feed</button>
      </StyledBtn>
      <form style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <label>New Feed:</label>
          <input type="text" value={text} name="text" onChange={onChange} required />
          <button onClick={addFeed}>Add</button>
        </div>
      </form>

      <div>
        {filteredFeeds.map((feed) => (
          <FeedItem key={feed.id} feed={feed} setFeeds={setFeeds} />
        ))}
      </div>
    </div>
  );
};

const StyledBtn = styled.div`
  display: flex;
  justify-content: center;
`;

export default Feed;
