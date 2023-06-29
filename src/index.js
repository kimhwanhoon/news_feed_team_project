import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from 'redux/config/configStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 1. Provider를 App 컴포넌트 위에 쓴다.
  // 2. configureStore에서 만든 데이터를 Provider의 store에 넣어준다.
  <Provider store={store}>
    <App />
  </Provider>
);
