// actions.js

// 사용자 정보 설정 액션 타입
export const SET_USER = 'SET_USER';

// 게시물 설정 액션 타입
export const SET_POSTS = 'SET_POSTS';

// 프로필 이미지 설정 액션 타입
export const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE';

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
