import './App.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
// import Auth from './components/Auth';
import Feed from './components/Feed';
import Searchbar from './components/Searchbar';
import Detail from './components/detail/Detail';

const App = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ marginRight: '10px' }}>FeedIT</p>
        <div style={{ flex: '1', textAlign: 'center' }}>
          <Searchbar />
        </div>
        <button style={{ marginRight: '10px' }}>Login</button>
      </div>
      <Feed />
      <Detail />
    </div>
  );
};

export default App;
