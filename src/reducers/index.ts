import { Action, combineReducers } from 'redux';
import notification from './notification';
import user from './user';
import { AuthActions } from "reducers/user";
import { INotificationAction } from "reducers/notification";
import { defaultNotificationState } from 'reducers/notification';
import { defaultUserState } from 'reducers/user';

const appReducer = combineReducers({
    notification,
    user,
});

export type rootState = ReturnType<typeof appReducer>;

export type AllActions = AuthActions | INotificationAction;

export const DefaultAppState = {
    notification: defaultNotificationState,
    user: defaultUserState
};

const rootReducer = (state: rootState = DefaultAppState, action: Action<AllActions>) => {
    return appReducer(state, action);
};


export default rootReducer;
