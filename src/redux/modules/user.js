const initialState = '';
export const actionTypes = {
  FETCH_USER: 'fetch user data',
  LOGIN_WITH_EMAIL: 'login with email and password',
  LOGOUT: 'logout',
  SOCIAL: 'social',
  SIGNUP: 'Sign Up'
};

const loginOutButtonToggle = () => {
  document.getElementById('home-log-in-button').classList.toggle('hidden');
  document.getElementById('home-log-out-button').classList.toggle('hidden');
};

function reduxUser(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case actionTypes.FETCH_USER: {
      loginOutButtonToggle();
      console.log('fetch payload:', action.payload);
      return action.payload;
    }
    case actionTypes.LOGIN_WITH_EMAIL: {
      alert(`Welcome, ${action.payload}`);
      loginOutButtonToggle();
      return action.payload;
    }
    case actionTypes.LOGOUT: {
      const user = initialState;
      loginOutButtonToggle();
      return user;
    }
    case actionTypes.SOCIAL: {
      if (action.payload.isNewUser) {
        alert(`Welcome to join us, ${action.payload.profile.name}!`);
      } else {
        alert(`Welcome back, ${action.payload.profile.name}!`);
      }
      loginOutButtonToggle();
      console.log(action);
      return action.payload.profile.name;
    }
    case actionTypes.SIGNUP: {
      loginOutButtonToggle();
      return action.payload;
    }
  }
}

export default reduxUser;
