const initialState = {
  loginSuccess: false
};

const SUCCESS_LOGIN_ACTION_TYPE = {
  LOGIN_SUCCESS: '로그인 성공'
};

export const loginSucess = () => {
  return {
    type: SUCCESS_LOGIN_ACTION_TYPE.LOGIN_SUCCESS
  };
};

const isLoginSuccess = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case SUCCESS_LOGIN_ACTION_TYPE.LOGIN_SUCCESS: {
      return {
        ...state,
        loginSuccess: true
      };
    }
  }
};
export default isLoginSuccess;
