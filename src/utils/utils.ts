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

/**
 * Helper method, safely gets deep prop in the object
 * @param object - target object
 * @param path {string} - path to target prop in the object
 * @returns {*}
 * @example
 * const obj = {a: {b: 1}, c: null}
 * getDeepProp(obj, 'a.b')  // returns 1
 */
export function getDeepProp(object: object, path: string): any {
    const p = path.split('.');
    return p.reduce((xs: any, x: any) => (xs && xs[x] !== undefined ? xs[x] : undefined), object);
}




