import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import appReducer from './reducer';

const store = createStore(appReducer, applyMiddleware(ReduxPromise));

export default store;