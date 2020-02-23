import { ActionCreator } from "redux";

import { loginActionTypes } from "ac/constants";

export interface SignInRequestAction {
    type: loginActionTypes.LOGIN_REQUEST,
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

export const signInRequest: ActionCreator<SignInRequestAction> = (email: string, password: string) => ({
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
