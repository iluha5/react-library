import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

export const middlewares = [thunkMiddleware];

export const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(...middlewares)
    )
);

