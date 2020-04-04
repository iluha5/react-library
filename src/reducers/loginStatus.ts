import { Reducer } from "redux";
import {
    ILoginStatusFailureAction,
    ILoginStatusRequestAction,
    ILoginStatusSuccessAction,
    LoginStatusActions
} from "ac/loginStatus";
import { LoginStatusActionTypes } from "ac/constants";

export interface ILoginStatusState {
    isFetching: boolean,
    isFetched: boolean,
    error: boolean,
    data: {
        isUserLoggedIn: boolean,
    }
}

export const defaultLoginStatusState = {
    isFetching: true,
    isFetched: false,
    error: false,
    data: {
        isUserLoggedIn: false,
    }
};

const loginStatus: Reducer<ILoginStatusState, LoginStatusActions> = (
    state: ILoginStatusState = defaultLoginStatusState,
    action: LoginStatusActions
) => {
    const { type } = action;

    switch (type) {
        case LoginStatusActionTypes.LOGIN_STATUS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false,
                error: false,
            };
        case LoginStatusActionTypes.LOGIN_STATUS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                isFetched: true,
                error: false,
                data: {
                    isUserLoggedIn: action.payload.isUserLoggedIn,
                }
            };
        }
        case LoginStatusActionTypes.LOGIN_STATUS_FAILURE:
            return {
                ...state,
                isFetching: false,
                isFetched: false,
                error: true,
            };
        default:
            return state;
    }
};

export default loginStatus;
