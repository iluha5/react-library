export const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR';
export const NOTIFICATION_PASSED = 'NOTIFICATION_PASSED';

// Regex
// export const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/; // eslint-disable-line
export const REGEX_PASSWORD = /^((?=.*[0-9])|(?=.*[@$!%*#?&,.\-+()\[\]{}_\/]))(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9@$!%*#?&,.\-+()\[\]{}_\/]){8,32}$/; // eslint-disable-line
export const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|((([a-zA-Z0-9]+[a-zA-Z\-0-9]+[a-zA-Z0-9]\.)|([a-zA-Z0-9]{1,}\.))+[a-zA-Z]{2,10}))$/; // eslint-disable-line
export const REGEX_NICKNAME = /^([a-zA-Z])[a-zA-Z0-9_-]{0,31}$/; // eslint-disable-line
export const REGEX_NAME = /^([a-zA-Z])[a-zA-Z0-9]{0,63}$/; // eslint-disable-line
