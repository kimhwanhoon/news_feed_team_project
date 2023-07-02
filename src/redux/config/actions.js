// actions.js
import { initialState } from "redux/modules/user";
// 사용자 정보 설정 액션 타입
export const SET_USER = 'SET_USER';

// 게시물 설정 액션 타입
export const SET_POSTS = 'SET_POSTS';

// 프로필 이미지 설정 액션 타입
export const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE';

export const USER_DATA_ACTION_TYPES = 'USER_DATA_ACTION_TYPES'

// 사용자 정보 설정 액션 생성자
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

// 게시물 설정 액션 생성자
export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts
});

// 프로필 이미지 설정 액션 생성자
export const setProfileImage = (imageUrl) => ({
  type: SET_PROFILE_IMAGE,
  payload: imageUrl
});

//글 작성 설정 액션 생성자
export const loginAction = () => {
  return {
    type: 'LOGIN' 
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
