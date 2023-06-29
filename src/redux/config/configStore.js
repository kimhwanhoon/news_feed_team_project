import { createStore } from 'redux';
import { combineReducers } from 'redux';
import write from '../modules/write';

const rootReducer = combineReducers({
  write: write
  // // reducer 들을 여기에 적는다.
});

const store = createStore(rootReducer);

// export default: 다른 파일에서도 얘를 가져다 쓸 수 있음
export default store;
