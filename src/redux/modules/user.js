const initialState = 'Not logged in user';

function reduxUser(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case 'fetch user data': {
      const user = action.payload;
      return user.displayName || user.email;
    }
    case 'logout': {
      const user = initialState;
      return user;
    }
    case 'google': {
      if (action.payload.isNewUser) {
        alert(`Welcome to join us, ${action.payload.profile.name}!`);
      } else {
        alert(`Welcome back, ${action.payload.profile.name}!`);
      }
      return action.payload.profile.name;
    }
    case 'login with email and password.': {
      alert(`Welcome, ${action.payload}`);
      return action.payload;
    }
    case 'github': {
      if (action.payload.isNewUser) {
        alert(`Welcome to join us, ${action.payload.profile.name}!`);
      } else {
        alert(`Welcome back, ${action.payload.profile.name}!`);
      }
      return action.payload.profile.name;
    }
  }
}

export default reduxUser;
