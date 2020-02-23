import { SignInFailAction, SignInRequestAction, SignInSuccessAction } from "ac/auth";
import { loginActionTypes } from "ac/constants";

export interface IUserState {
    isFetching: boolean,
    isFetched: boolean,
    isError: boolean,
    data: {
        email: string,
        token: string,
    }
}

export const defaultUserState = {
    isFetching: false,
    isFetched: false,
    isError: false,
    data: {
        email: '',
        token: '',
    }
};

export type AuthActions = SignInRequestAction | SignInSuccessAction | SignInFailAction;

const user = (state: IUserState = defaultUserState, action: AuthActions) => {
    switch (action.type) {
        case loginActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false,
                isError: false,
            };
        case loginActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isFetched: true,
                isError: false,
                data: {
                    ...state.data,
                    email: action.payload.email,
                    token: action.payload.token,
                }
            };
        case loginActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isFetched: false,
                isError: true,
            };
        default:
            return state;
    }
};

export default user;
