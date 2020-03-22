import { put, takeLatest, call } from 'redux-saga/effects'
import { signInFail, SignInRequestAction, signInSuccess } from "ac/auth";
import { loginActionTypes } from "ac/constants";
import { NOTIFICATION_ERROR, NOTIFICATION_PASSED } from "utils/constants";
import { showNotification } from 'utils/utils';

import fb from "../firebase/firebase";

function* signIn(action: SignInRequestAction) {
    const { email, password } = action.payload;

    try {
        const user = yield call(fb.loginWithEmailAndPassword, email, password);

        yield put(signInSuccess(user.user.email, user.user.refreshToken));

        showNotification(NOTIFICATION_PASSED, 'You are successfully logged in!');
    } catch {
        yield put(signInFail());

        showNotification(NOTIFICATION_ERROR, 'Login failed! Please, try again!')
    }
}

function* signInSaga() {
    yield takeLatest(loginActionTypes.LOGIN_REQUEST, signIn);
}

export default signInSaga;
