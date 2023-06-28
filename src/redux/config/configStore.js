import { createStore } from 'redux';
import { combineReducers } from 'redux';
import feeds from 'redux/modules/feeds';

const rootReducer = combineReducers({
  feeds
});
const store = createStore(rootReducer);

export default store;
