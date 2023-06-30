import './App.css';
import './reset.css';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Feed from './components/Feed';
import Searchbar from './components/Searchbar';
import Router from 'shared/Router';
import Detail from './shared/detail';

const App = () => {
  const [feeds, setFeeds] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ marginRight: '10px' }}>FeedIT</p>
        <div style={{ flex: '1', textAlign: 'center' }}>
          <Searchbar feeds={feeds} setFilteredFeeds={setFeeds} onSearchChange={handleSearchChange} />
        </div>
        <button style={{ marginRight: '10px' }}>Login</button>
      </div>
      <Feed feeds={feeds} setFeeds={setFeeds} searchValue={searchValue} />
      <Detail />
      <Router />;
    </div>
  );
};

export default App;
