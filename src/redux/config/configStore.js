import { createStore } from 'redux';
import { combineReducers } from 'redux';
import sampleReducer from 'redux/modules/sampleReducer';
const rootReducer = combineReducers({
  // reducer 들을 여기에 적는다.
  sampleReducer
});
const store = createStore(rootReducer);

export default store;
