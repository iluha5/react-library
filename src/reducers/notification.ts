import {
    loginActionTypes,
    notificationsActionTypes,
} from 'ac/constants';
import { notificationTypes } from 'utils/constants';

export interface INotificationData {
    id?: number,
    title?: string,
    description?: string,
    message?: string,
    image?: string,
    name?: string,
}

export interface INotificationState {
    type: string,
    shouldRender: boolean,
    data: INotificationData,
}

export interface INotificationAction {
    type: notificationsActionTypes | loginActionTypes.LOGOUT_SUCCESS,
    payload?: {
        data: INotificationData,
        type: notificationTypes,
    }
}

export const defaultNotificationState = {
    type: '',
    shouldRender: false,
    data: {},
};

const notification = (state: INotificationState = defaultNotificationState, action: INotificationAction) => {
    switch (action.type) {
        case notificationsActionTypes.UPDATE_NOTIFICATION:
            if (action.payload) {
                return {
                    ...state,
                    type: action.payload.type,
                    shouldRender: true,
                    data: action.payload.data,
                };
            } else return state;
        case notificationsActionTypes.REMOVE_NOTIFICATION:
            return { ...defaultNotificationState };
        case loginActionTypes.LOGOUT_SUCCESS:
            return { ...defaultNotificationState };
        default:
            return state;
    }
};

export default notification;
