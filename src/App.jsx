import './App.css';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Feed from './components/Feed';
import Searchbar from './components/Searchbar';
import Detail from './shared/Detail';

const App = () => {
  const [feeds, setFeeds] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // Handle user authentication state changes
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
    </div>
  );
};

export default App;
