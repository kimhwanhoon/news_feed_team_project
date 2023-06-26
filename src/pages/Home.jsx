import React from 'react';
import Input from 'redux/components/Input';
import Searchbar from 'redux/components/Searchbar';
import FeedList from '../redux/components/FeedList';

function Home() {
  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>FeedIT</div>
        <div style={{ flex: '1', textAlign: 'center' }}>
          <Searchbar />
        </div>
        <button>Login</button>
      </nav>
      <form style={{ flex: '1', textAlign: 'center' }}>
        <button style={{ marginTop: '20px' }}>New feed</button>
      </form>
      <Input />
      <div>
        <FeedList />
      </div>
    </div>
  );
}

export default Home;
