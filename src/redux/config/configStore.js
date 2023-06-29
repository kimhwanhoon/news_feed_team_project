import { createStore } from 'redux';
import { combineReducers } from 'redux';
import isResetMailSent from 'redux/modules/forgotMailSent';
import isLoginSuccess from 'redux/modules/isLoginSuccess';
import loginAndLogoutButtonToggler from 'redux/modules/loginLogoutToggle';
import loginModalToggler from 'redux/modules/loginModalToggler';
import userData from 'redux/modules/user';
const rootReducer = combineReducers({
  // reducer 들을 여기에 적는다.
  userData,
  isLoginSuccess,
  isResetMailSent,
  loginModalToggler,
  loginAndLogoutButtonToggler
});
const store = createStore(rootReducer);

export default store;
