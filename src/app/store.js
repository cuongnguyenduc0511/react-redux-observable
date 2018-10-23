import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';

const initialState = {};

const epicMiddleware = createEpicMiddleware();
export const history = createBrowserHistory();
const middleware = [epicMiddleware , routerMiddleware(history)];

const store = createStore(
    rootReducer, 
    initialState, 
    applyMiddleware(...middleware)
);

epicMiddleware.run(rootEpic);

store.subscribe(() => {
    console.log(store.getState());
})

export default store;