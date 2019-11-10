import { store } from 'store';
import { updateNotification } from 'ac/notifications';

export const showNotification = (type, title) => {
    updateNotification(
        type,
        {
            title,
        }
    )(store.dispatch);
};
