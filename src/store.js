import { createStore } from 'redux';

// Initial state
const initialState = {
  isLoggedIn: false, // Adding authentication state
  user: null, // Optional: You can store the user information here (like user name, email, etc.)
};

// Action Types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Action Creators
export const login = (user) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

// Reducer
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, user: action.payload };
    case LOGOUT:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(appReducer);

export default store;
