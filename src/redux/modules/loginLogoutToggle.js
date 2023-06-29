// 액션 타입
const TOGGLE_MODAL_ACTION_TYPES = {
  LOGIN: '로그인 버튼',
  LOGOUT: '로그아웃 버튼'
};
// 액션 생성자
export const toggleLoginButtonClassName = () => ({
  type: TOGGLE_MODAL_ACTION_TYPES.LOGIN
});
export const toggleLogoutButtonClassName = () => ({
  type: TOGGLE_MODAL_ACTION_TYPES.LOGOUT
});

// 리듀서
const initialState = {
  LOGIN: '',
  LOGOUT: ''
};

const loginAndLogoutButtonToggler = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL_ACTION_TYPES.LOGIN: {
      return {
        ...state,
        LOGIN: state.LOGIN === '' ? 'hidden' : ''
      };
    }
    case TOGGLE_MODAL_ACTION_TYPES.LOGOUT: {
      return {
        ...state,
        LOGOUT: state.LOGOUT === '' ? 'hidden' : ''
      };
    }
    default:
      return state;
  }
};

export default loginAndLogoutButtonToggler;

// 모달 토글 함수
export const handleToggleLoginButton = (dispatch) => {
  dispatch(toggleLoginButtonClassName());
};

export const handleToggleLogoutButton = (dispatch) => {
  dispatch(toggleLogoutButtonClassName());
};
