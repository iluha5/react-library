import { ActionCreator } from "redux";

import { LoginActionTypes } from "ac/constants";

export interface SignInRequestAction {
    type: LoginActionTypes.LOGIN_REQUEST,
    payload: {
        email: string,
        password: string
    }
}

export interface SignUpRequestAction {
    type: LoginActionTypes.SIGNUP_REQUEST,
    payload: {
        email: string,
        password: string
    }
}

export interface SignInSuccessAction {
    type: LoginActionTypes.LOGIN_SUCCESS,
    payload: {
        email: string,
        token: string
    }
}

export interface SignUpSuccessAction {
    type: LoginActionTypes.SIGNUP_SUCCESS,
    payload: {
        email: string,
        token: string
    }
}

export interface SignInFailAction {
    type: LoginActionTypes.LOGIN_FAILURE,
}

export interface SignUpFailAction {
    type: LoginActionTypes.SIGNUP_FAILURE,
    payload: {
        errorCode: string,
    }

}

export interface LogoutRequestAction {
    type: LoginActionTypes.LOGOUT_REQUEST,
}

export interface LogoutFailAction {
    type: LoginActionTypes.LOGOUT_FAILURE,
}

export interface LogoutSuccessAction {
    type: LoginActionTypes.LOGOUT_SUCCESS,
}

export type LogoutActions = LogoutFailAction | LogoutRequestAction | LogoutSuccessAction;

export const signInRequest: ActionCreator<SignInRequestAction> = (email: string, password: string) => ({
    type: LoginActionTypes.LOGIN_REQUEST,
    payload: {
        email,
        password,
    }
});

export const signUpRequest: ActionCreator<SignUpRequestAction> = (email: string, password: string) => ({
    type: LoginActionTypes.SIGNUP_REQUEST,
    payload: {
        email,
        password,
    }
});

export const signUpSuccess: ActionCreator<SignUpSuccessAction> = (email: string, token: string) => ({
    type: LoginActionTypes.SIGNUP_SUCCESS,
    payload: {
        email,
        token,
    }
});

export const signInSuccess: ActionCreator<SignInSuccessAction> = (email: string, token: string) => ({
    type: LoginActionTypes.LOGIN_SUCCESS,
    payload: {
        email,
        token,
    }
});

export const signInFail: ActionCreator<SignInFailAction> = () => ({
    type: LoginActionTypes.LOGIN_FAILURE,
});

export const signUpFail: ActionCreator<SignUpFailAction> = (errorCode: string) => ({
    type: LoginActionTypes.SIGNUP_FAILURE,
    payload: {
        errorCode
    }
});

export const logoutRequest: ActionCreator<LogoutRequestAction> = () => ({
    type: LoginActionTypes.LOGOUT_REQUEST,
});

export const logoutFail: ActionCreator<LogoutFailAction> = () => ({
    type: LoginActionTypes.LOGOUT_FAILURE,
});

export const logoutSuccess: ActionCreator<LogoutSuccessAction> = () => ({
    type: LoginActionTypes.LOGOUT_SUCCESS,
});
