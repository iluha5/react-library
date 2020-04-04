import { LoginStatusActionTypes } from "ac/constants";
import { ActionCreator } from "redux";

export interface ILoginStatusRequestAction {
    type: LoginStatusActionTypes.LOGIN_STATUS_REQUEST,
}

export interface ILoginStatusSuccessOptions {
    isUserLoggedIn: boolean,
}

export interface ILoginStatusSuccessAction {
    type: LoginStatusActionTypes.LOGIN_STATUS_SUCCESS,
    payload: ILoginStatusSuccessOptions
}

export interface ILoginStatusFailureAction {
    type: LoginStatusActionTypes.LOGIN_STATUS_FAILURE,
}
export type LoginStatusActions = ILoginStatusRequestAction | ILoginStatusSuccessAction | ILoginStatusFailureAction;


export const loginStatusRequest: ActionCreator<ILoginStatusRequestAction> = () => ({
    type: LoginStatusActionTypes.LOGIN_STATUS_REQUEST,
});

export const loginStatusSuccess: ActionCreator<ILoginStatusSuccessAction> = (options: ILoginStatusSuccessOptions) => ({
    type: LoginStatusActionTypes.LOGIN_STATUS_SUCCESS,
    payload: options,
});
export const loginStatusFailure: ActionCreator<ILoginStatusFailureAction> = () => ({
    type: LoginStatusActionTypes.LOGIN_STATUS_FAILURE,
});
