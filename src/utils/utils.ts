import { store } from 'store/index';
import { updateNotification } from 'ac/notifications';
import { REGEX_EMAIL } from 'utils/constants';

export const showNotification = (type: string, title: string) => {
    updateNotification(
        type,
        {
            title,
        }
    )(store.dispatch);
};


export const isEmailFn = (str: string) => {
    return REGEX_EMAIL.test(str.trim().toLowerCase());
};


