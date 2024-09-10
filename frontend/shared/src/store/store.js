import { createStore } from 'redux';
import { authReducer } from './user';

const store = createStore(authReducer);

export default store;