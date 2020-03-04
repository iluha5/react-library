import { ActionCreator } from "redux";

import { loginActionTypes } from "ac/constants";

export interface SignInRequestAction {
    type: loginActionTypes.LOGIN_REQUEST,
    payload: {
        email: string,
        password: string
    }
}

export interface SignUpRequestAction {
    type: loginActionTypes.SIGNUP_REQUEST,
    payload: {
        email: string,
        password: string
    }
}

export interface SignInSuccessAction {
    type: loginActionTypes.LOGIN_SUCCESS,
    payload: {
        email: string,
        token: string
    }
}

export interface SignInFailAction {
    type: loginActionTypes.LOGIN_FAILURE,
}

export interface LogoutRequestAction {
    type: loginActionTypes.LOGOUT_REQUEST,
}

export interface LogoutFailAction {
    type: loginActionTypes.LOGOUT_FAILURE,
}

export interface LogoutSuccessAction {
    type: loginActionTypes.LOGOUT_SUCCESS,
}

export type LogoutActions = LogoutFailAction | LogoutRequestAction | LogoutSuccessAction;

export const signInRequest: ActionCreator<SignInRequestAction> = (email: string, password: string) => ({
    type: loginActionTypes.LOGIN_REQUEST,
    payload: {
        email,
        password,
    }
});

export const signUpRequest: ActionCreator<SignUpRequestAction> = (email: string, password: string) => ({
    type: loginActionTypes.LOGIN_REQUEST,
    payload: {
        email,
        password,
    }
});

export const signInSuccess: ActionCreator<SignInSuccessAction> = (email: string, token: string) => ({
    type: loginActionTypes.LOGIN_SUCCESS,
    payload: {
        email,
        token,
    }
});

export const signInFail: ActionCreator<SignInFailAction> = () => ({
    type: loginActionTypes.LOGIN_FAILURE,
});

export const logoutRequest: ActionCreator<LogoutRequestAction> = () => ({
    type: loginActionTypes.LOGOUT_REQUEST,
});

export const logoutFail: ActionCreator<LogoutFailAction> = () => ({
    type: loginActionTypes.LOGOUT_FAILURE,
});

export const logoutSuccess: ActionCreator<LogoutSuccessAction> = () => ({
    type: loginActionTypes.LOGOUT_SUCCESS,
});
