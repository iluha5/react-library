import { store } from 'store';
import { updateNotification } from 'ac/notifications';
import { REGEX_EMAIL } from 'utils/constants';

export const showNotification = (type, title) => {
    updateNotification(
        type,
        {
            title,
        }
    )(store.dispatch);
};


export const isEmailFn = (str) => {
    return REGEX_EMAIL.test(str.trim().toLowerCase());
};


