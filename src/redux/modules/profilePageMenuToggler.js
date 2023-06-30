// 액션 타입
const TOGGLE_USER_PAGE_MENU_ACTION_TYPES = {
  PROFILE: '프로필 메뉴',
  MY_EMAIL: '이메일 메뉴',
  CHANGE_PASSWORD: '비밀번호 바꾸기 모달'
};

// 액션 생성자
export const menuProfileToggler = () => ({
  type: TOGGLE_USER_PAGE_MENU_ACTION_TYPES.PROFILE
});
export const menuMyEmailToggler = () => ({
  type: TOGGLE_USER_PAGE_MENU_ACTION_TYPES.MY_EMAIL
});
export const menuChangePasswordToggler = () => ({
  type: TOGGLE_USER_PAGE_MENU_ACTION_TYPES.CHANGE_PASSWORD
});

const initialState = {
  PROFILE: true,
  MY_EMAIL: false,
  CHANGE_PASSWORD: false
};

// 리듀서
function profilePageMenuToggler(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
    case TOGGLE_USER_PAGE_MENU_ACTION_TYPES.PROFILE: {
      return {
        ...state,
        PROFILE: true,
        MY_EMAIL: false,
        CHANGE_PASSWORD: false
      };
    }
    case TOGGLE_USER_PAGE_MENU_ACTION_TYPES.MY_EMAIL: {
      return {
        ...state,
        PROFILE: false,
        MY_EMAIL: true,
        CHANGE_PASSWORD: false
      };
    }
    case TOGGLE_USER_PAGE_MENU_ACTION_TYPES.CHANGE_PASSWORD: {
      return {
        ...state,
        PROFILE: false,
        MY_EMAIL: false,
        CHANGE_PASSWORD: true
      };
    }
  }
}

export default profilePageMenuToggler;

export const userPageProfileToggler = (dispatch) => {
  dispatch(menuProfileToggler());
};
export const userPageMyEmailToggler = (dispatch) => {
  dispatch(menuMyEmailToggler());
};
export const userPageChangePasswordToggler = (dispatch) => {
  dispatch(menuChangePasswordToggler());
};
