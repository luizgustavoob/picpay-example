import { SET_LOADING } from './actions/loading-action';

const INITIAL_STATE = {
  loading: false
};

const appReducer =  (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload }
    default:
      return state;
  }
};

export default appReducer;