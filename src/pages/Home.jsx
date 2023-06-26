import React from 'react';
import Input from 'components/Input';
import Searchbar from 'components/Searchbar';
import FeedList from '../components/FeedList';

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
