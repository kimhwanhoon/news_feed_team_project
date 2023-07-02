import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDoc, collection, getDocs, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import FeedItem from './FeedItem';
import LoginModal from './auth/Login';
import { loginAction } from 'redux/config/actions';
import { saveUserDataWithEmail, saveUserDataWithSocial, deleteUserDataBySignout, fetchUserData, signupUserDataUpdate } from '../redux/modules/user';


const Feed = ({ searchValue }) => {
  const [text, setText] = useState('');
  const isLoggedIn = useSelector(state => state.auth?.isLoggedIn);
  const user = useSelector(state => state.userData) || {}; // Fallback to an empty object if user is undefined
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'feeds'));
      const querySnapshot = await getDocs(q);
      const initialFeeds = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeeds(initialFeeds);
    };

    fetchData();

    const unsubscribe = onSnapshot(collection(db, 'feeds'), snapshot => {
      const updatedFeeds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeeds(updatedFeeds);
    });

    return () => unsubscribe();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'text') {
      setText(value);
    }
  };

  const handleWriteClick = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      addFeed();
    } else {
      alert("로그인이 필요한 서비스입니다.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addFeed = async (event) => {
    event.preventDefault();
    const newFeed = {
      text: text,
      authorName: user?.name || "Unknown",
      authorProfileUrl: user?.profileUrl || "",
    };

  

    const collectionRef = collection(db, 'feeds');
    await addDoc(collectionRef, newFeed);

    setText('');
  };

  const filteredFeeds = feeds.filter(feed => (
    typeof feed.text === 'string' &&
    feed.text.toLowerCase().includes(searchValue.toLowerCase())
  ));

  return (
    <div>
      <StyledBtn>
        <button id='newFeed' onClick={handleWriteClick}>New feed</button>
      </StyledBtn>
      <form style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <label>New Feed:</label>
          <input type="text" value={text} name="text" onChange={onChange} required />
          <button onClick={addFeed}>Add</button>
          {isModalOpen && <LoginModal onClose={closeModal} />}
        </div>
      </form>

      <div>
        {filteredFeeds.map(feed => (
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

export default Feed
