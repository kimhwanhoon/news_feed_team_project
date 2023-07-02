const initialState = {
    loginSuccess: false
  };
  
  const SUCCESS_LOGIN_ACTION_TYPE = {
    LOGIN_SUCCESS: '로그인 성공',
    LOGOUT_SUCCESS: '로그아웃 성공'
  };
  
  export const loginSucess = () => {
    return {
      type: SUCCESS_LOGIN_ACTION_TYPE.LOGIN_SUCCESS
    };
  };
  export const logoutSucess = () => {
    return {
      type: SUCCESS_LOGIN_ACTION_TYPE.LOGOUT_SUCCESS
    };
  };
  
  const isLoginSuccess = (state = initialState, action) => {
    switch (action.type) {
      case SUCCESS_LOGIN_ACTION_TYPE.LOGIN_SUCCESS: {
        return {
          loginSuccess: true
        };
      }
      case SUCCESS_LOGIN_ACTION_TYPE.LOGOUT_SUCCESS: {
        return {
          loginSuccess: false
        };
      }
      default: {
        return state;
      }
    }
  };
  export default isLoginSuccess;