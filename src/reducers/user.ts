import {
    SignInFailAction,
    SignInRequestAction,
    SignInSuccessAction, SignUpFailAction,
    ISignUpRequestAction,
    SignUpSuccessAction
} from "ac/auth";
import { LoginActionTypes } from "ac/constants";

export interface IUserState {
    isFetching: boolean,
    isFetched: boolean,
    isError: boolean,
    errorCode: string,
    data: {
        email: string,
        token: string,
    }
}

export const defaultUserState = {
    isFetching: false,
    isFetched: false,
    isError: false,
    errorCode: '',
    data: {
        email: '',
        token: '',
    }
};

export type AuthActions = SignInRequestAction
    | SignInSuccessAction
    | SignInFailAction
    | ISignUpRequestAction
    | SignUpSuccessAction
    | SignUpFailAction;

const user = (state: IUserState = defaultUserState, action: AuthActions) => {
    switch (action.type) {
        case LoginActionTypes.LOGIN_REQUEST:
        case LoginActionTypes.SIGNUP_REQUEST:
            return {
                ...state,
                errorCode: '',
                isFetching: true,
                isFetched: false,
                isError: false,
            };
        case LoginActionTypes.LOGIN_SUCCESS:
        case LoginActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                errorCode: '',
                isFetching: false,
                isFetched: true,
                isError: false,
                data: {
                    ...state.data,
                    email: action.payload.email,
                    token: action.payload.token,
                }
            };
        case LoginActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                errorCode: '',
                isFetching: false,
                isFetched: false,
                isError: true,
            };
        case LoginActionTypes.SIGNUP_FAILURE:
            return {
                ...state,
                errorCode: action.payload.errorCode,
                isFetching: false,
                isFetched: false,
                isError: true,
            };
        default:
            return state;
    }
};

export default user;
