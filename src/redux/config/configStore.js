import { createStore } from 'redux';
import { combineReducers } from 'redux';
import isResetMailSent from 'redux/modules/forgotMailSent';
import isLoginSuccess from 'redux/modules/isLoginSuccess';
import userData from 'redux/modules/user';import feeds from 'redux/modules/feeds';

const rootReducer = combineReducers({
  feeds,
  userData,
  isLoginSuccess,
  isResetMailSent
});
const store = createStore(rootReducer);

export default store;
