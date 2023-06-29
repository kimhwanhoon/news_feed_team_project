import { createStore } from 'redux';
import { combineReducers } from 'redux';
import isResetMailSent from 'redux/modules/forgotMailSent';
import isLoginSuccess from 'redux/modules/isLoginSuccess';
import userData from 'redux/modules/user';
import feeds from 'redux/modules/\bfeeds';

const rootReducer = combineReducers({
  // reducer 들을 여기에 적는다.
  userData,
  isLoginSuccess,
  isResetMailSent,
  feeds
});
const store = createStore(rootReducer);

export default store;
