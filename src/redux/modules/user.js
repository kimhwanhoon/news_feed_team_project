import { USER_DATA_ACTION_TYPES } from "redux/config/actions";

export const initialState = {
  user: null,
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
    case USER_DATA_ACTION_TYPES.EMAIL_PASSWORD:
    case USER_DATA_ACTION_TYPES.SOCIAL_SIGNIN:
    case USER_DATA_ACTION_TYPES.SIGN_UP: {
      return {
        ...state,
        user: action.payload
      };
    }
    case USER_DATA_ACTION_TYPES.SIGN_OUT: {
      return initialState;
    }
    case USER_DATA_ACTION_TYPES.FETCH_DATA: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
export default userData;