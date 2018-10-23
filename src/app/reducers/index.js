import { combineReducers } from 'redux';
import requestReducer from './requestReducer';
import commonReducer from './commonReducer';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  // dashboard reducer,
  requests: requestReducer,
  common: commonReducer,
  routing: routerReducer
});
