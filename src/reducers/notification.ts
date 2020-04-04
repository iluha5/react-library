import {
    NotificationsActionTypes,
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
    type: NotificationsActionTypes,
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
        case NotificationsActionTypes.UPDATE_NOTIFICATION:
            if (action.payload) {
                return {
                    ...state,
                    type: action.payload.type,
                    shouldRender: true,
                    data: action.payload.data,
                };
            } else return state;
        case NotificationsActionTypes.REMOVE_NOTIFICATION:
            return { ...defaultNotificationState };
        default:
            return state;
    }
};

export default notification;
