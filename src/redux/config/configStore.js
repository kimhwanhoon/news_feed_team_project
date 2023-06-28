import { createStore } from 'redux';
import { combineReducers } from 'redux';
import userData from 'redux/modules/user';
const rootReducer = combineReducers({
  // reducer 들을 여기에 적는다.
  userData
});
const store = createStore(rootReducer);

export default store;
