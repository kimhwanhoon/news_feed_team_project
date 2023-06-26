import { createStore } from 'redux';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // reducer 들을 여기에 적는다.
});
const store = createStore(rootReducer);

export default store;
