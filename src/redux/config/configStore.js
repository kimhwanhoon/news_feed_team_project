import { createStore } from 'redux';
import { combineReducers } from 'redux';
import feeds from 'redux/modules/feeds';
import isResetMailSent from 'redux/modules/forgotMailSent';
import isLoginSuccess from 'redux/modules/isLoginSuccess';
import userData from 'redux/modules/user';
const rootReducer = combineReducers({
  feeds,
  userData,
  isLoginSuccess,
  isResetMailSent
});
const store = createStore(rootReducer);

export default store;
