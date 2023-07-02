import uuid from 'react-uuid';

const ADD_FEED = 'ADD_FEED';
const REMOVE_FEED = 'REMOVE_FEED';
const UPDATE_FEED = 'UPDATE_FEED';

export const addFeed = (payload) => {
  return {
    type: ADD_FEED,
    payload
  };
};

export const removeFeed = (payload) => {
  return {
    type: REMOVE_FEED,
    payload
  };
};

export const updateFeed = (payload) => {
  return {
    type: UPDATE_FEED,
    payload
  };
};

const initialState = [
  {
    id: uuid(),
    title: '리액트뽀개죠',
    body: '리액트뽀개죠 뉴스피드입니다. 이 곳은 바디 입니다'
  }
];

const feeds = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FEED:
      return [...state, action.payload];
    case REMOVE_FEED:
      return state.filter((item) => item.id !== action.payload);
    // case UPDATE_FEED:
    //   return
    default:
      return state;
  }
};

const authReducer = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
};

export default feeds;
