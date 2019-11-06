import {
    UPDATE_NOTIFICATION,
    REMOVE_NOTIFICATION,
} from 'ac/constants';

export const updateNotification = (type, data) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_NOTIFICATION,
            payload: {
                type: type,
                data: data,
            },
        });
    };
};

export const removeNotification = () => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_NOTIFICATION,
        });
    };
};
