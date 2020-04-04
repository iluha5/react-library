import { takeLatest, call, put } from 'redux-saga/effects'

import { LoginActionTypes } from "ac/constants";
import { logoutFail, logoutSuccess } from "ac/auth";
import { showNotification } from "utils/utils";
import { NOTIFICATION_ERROR, NOTIFICATION_PASSED } from "utils/constants";

import fb from "../firebase/firebase";

function * logout() {
    try {
        yield call(fb.signOut);

        yield put(logoutSuccess());

        showNotification(NOTIFICATION_PASSED, 'You were logged out!');
    } catch {
        yield put(logoutFail());

        showNotification(NOTIFICATION_ERROR, 'Logout failed! Please, try again!')
    }
}

function* logoutSaga() {
    yield takeLatest(LoginActionTypes.LOGOUT_REQUEST, logout);
}

export default logoutSaga;
