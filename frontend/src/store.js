import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialStates = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialStates,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;