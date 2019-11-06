import { combineReducers } from 'redux';
import notification from './notification';

const appReducer = combineReducers({
    data: combineReducers({
        notification,
    }),
});

const rootReducer = (state = {} , action) => {
    return appReducer(state, action);
};


export default rootReducer;
