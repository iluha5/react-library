export const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR';
export const NOTIFICATION_PASSED = 'NOTIFICATION_PASSED';

export enum notificationTypes {
    ACHIEVEMENT = 'ACHIEVEMENT',
    PASSED = 'PASSED',
    LAB_STOP_ERROR = 'LAB_STOP_ERROR',
    LAB_START_ERROR = 'LAB_START_ERROR',
    NOTIFICATION_ERROR = 'NOTIFICATION_ERROR',
}

//
// export enum notificationClassSuffixes {
//     ERROR = 'Error',
//         PASSING = 'Passing',
//         ACHIEVEMENT = 'Achievement',
//         DEFAULT = ''
// }


export const TIME_OVER = 'TIME_OVER';
export const TEN_SECONDS_LEFT = 'TEN_SECONDS_LEFT';

// auth
export const PASSWORD_INPUT_MAX_LENGTH = 32;
export const NAME_INPUT_MAX_LENGTH = 64;
export const EMAIL_NOT_VERIFIED_MESSAGE = 'Email is not verified';

// HTTP codes
export enum httpResponseCodes {
    EMPTY = 0,
    HTTP_401 = 401,
    HTTP_422 = 422,
}

// Regex
export const REGEX_PASSWORD = /^((?=.*[0-9])|(?=.*[@$!%*#?&,.\-+()\[\]{}_\/]))(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9@$!%*#?&,.\-+()\[\]{}_\/]){8,32}$/; // eslint-disable-line
export const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|((([a-zA-Z0-9]+[a-zA-Z\-0-9]+[a-zA-Z0-9]\.)|([a-zA-Z0-9]{1,}\.))+[a-zA-Z]{2,10}))$/; // eslint-disable-line
export const REGEX_NICKNAME = /^([a-zA-Z])[a-zA-Z0-9_-]{0,31}$/; // eslint-disable-line
export const REGEX_NAME = /^([a-zA-Z])[a-zA-Z0-9]{0,63}$/; // eslint-disable-line
