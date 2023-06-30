const initialState = [];

const USER_DATA_ACTION_TYPES = {
  EMAIL_PASSWORD: '이메일과 비밀번호로 유저 데이터 업데이트',
  SOCIAL_SIGNIN: '소셜로그인으로 유저 데이터 업데이트',
  SIGN_OUT: '로그아웃 버튼을 눌러 유저 데이터 삭제 업데이트',
  FETCH_DATA: '로드시 로그인 되어있는지 확인',
  SIGN_UP: '회원가입으로 유저 데이터 업데이트'
};

export const saveUserDataWithEmail = (payload) => {
  return {
    type: USER_DATA_ACTION_TYPES.EMAIL_PASSWORD,
    payload
  };
};

export const saveUserDataWithSocial = (payload) => {
  return {
    type: USER_DATA_ACTION_TYPES.SOCIAL_SIGNIN,
    payload
  };
};

export const deleteUserDataBySignout = () => {
  return {
    type: USER_DATA_ACTION_TYPES.SIGN_OUT
  };
};

export const fetchUserDate = (payload) => {
  return {
    type: USER_DATA_ACTION_TYPES.FETCH_DATA,
    payload
  };
};

export const signupUserDataUpdate = (payload) => {
  return {
    type: USER_DATA_ACTION_TYPES.SIGN_UP,
    payload
  };
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case USER_DATA_ACTION_TYPES.EMAIL_PASSWORD: {
      return action.payload;
    }
    case USER_DATA_ACTION_TYPES.SOCIAL_SIGNIN: {
      return action.payload;
    }
    case USER_DATA_ACTION_TYPES.SIGN_OUT: {
      return initialState;
    }
    case USER_DATA_ACTION_TYPES.FETCH_DATA: {
      return action.payload;
    }
    case USER_DATA_ACTION_TYPES.SIGN_UP: {
      return action.payload;
    }
  }
};

export default userData;