import { Action, combineReducers } from 'redux';
import notification from './notification';
import user from './user';
import loginStatus from './loginStatus';
import { AuthActions } from "reducers/user";
import { INotificationAction } from "reducers/notification";
import { defaultNotificationState } from 'reducers/notification';
import { defaultUserState } from 'reducers/user';
import { LoginActionTypes } from "ac/constants";
import { LogoutActions } from "ac/auth";
import { defaultLoginStatusState } from "reducers/loginStatus";
import { LoginStatusActions } from "ac/loginStatus";

const appReducer = combineReducers({
    notification,
    user,
    loginStatus,
});

export type rootState = ReturnType<typeof appReducer>;

export type AllActions = AuthActions | INotificationAction | LogoutActions | LoginStatusActions;

export const defaultAppState = {
    notification: defaultNotificationState,
    user: defaultUserState,
    loginStatus: defaultLoginStatusState,
};

const rootReducer = (state: rootState = defaultAppState, action: Action<AllActions>) => {
    if (action.type === LoginActionTypes.LOGOUT_SUCCESS) {
        state = defaultAppState;
    }

    return appReducer(state, action);
};


export default rootReducer;
