import { createStore, applyMiddleware } from 'redux';
import initialState from './initialState';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from 'reducers';

const store = createStore(reducers, initialState, applyMiddleware(promise, thunk));

export default store;