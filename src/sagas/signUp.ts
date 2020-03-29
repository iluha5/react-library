import { put, takeLatest, call } from 'redux-saga/effects'

import { signUpFail, SignUpRequestAction, signUpSuccess } from "ac/auth";

import fb from "../firebase/firebase";
import { showNotification } from "utils/utils";
import { NOTIFICATION_ERROR, NOTIFICATION_PASSED } from "utils/constants";
import { loginActionTypes } from "ac/constants";

function* signUp(action: SignUpRequestAction) {
    const { email, password } = action.payload;

    try {
        const user = yield call(fb.signUp, email, password);

        if (user.user && user.user.email && user.user.refreshToken) {
            yield put(signUpSuccess(user.user.email, user.user.refreshToken));

            showNotification(NOTIFICATION_PASSED, 'You are successfully signed up');
        } else {
            showNotification(NOTIFICATION_ERROR, 'Sign up failed! Please, try again!');
        }
    } catch (error) {
        const { code } = error;

        if (!code) {
            showNotification(NOTIFICATION_ERROR, 'Sign up failed! Please, try again!');

            return;
        }

        yield put(signUpFail(code));
    }
}

function* signUpSaga() {
    yield takeLatest(loginActionTypes.SIGNUP_REQUEST, signUp);
}

export default signUpSaga;
