import { Action, combineReducers } from 'redux';
import notification from './notification';
import user from './user';
import { AuthActions } from "reducers/user";
import { INotificationAction } from "reducers/notification";
import { defaultNotificationState } from 'reducers/notification';
import { defaultUserState } from 'reducers/user';
import { loginActionTypes } from "ac/constants";
import { LogoutActions } from "ac/auth";

const appReducer = combineReducers({
    notification,
    user,
});

export type rootState = ReturnType<typeof appReducer>;

export type AllActions = AuthActions | INotificationAction | LogoutActions;

export const defaultAppState = {
    notification: defaultNotificationState,
    user: defaultUserState
};

const rootReducer = (state: rootState = defaultAppState, action: Action<AllActions>) => {
    if (action.type === loginActionTypes.LOGOUT_SUCCESS) {
        state = defaultAppState;
    }

    return appReducer(state, action);
};


export default rootReducer;
