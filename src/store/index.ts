import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk';

import reducer from 'reducers/index';
import rootSaga from 'sagas/index';

const sagaMiddleware = createSagaMiddleware();

export const middlewares = [thunkMiddleware, sagaMiddleware];

export const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(...middlewares)
    )
);

sagaMiddleware.run(rootSaga);
