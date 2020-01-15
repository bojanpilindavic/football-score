import { createStore, applyMiddleware } from 'redux';
import teamReducer from './reducers/teamReducer';
import thunk from 'redux-thunk';

export default createStore(teamReducer, applyMiddleware(thunk));
