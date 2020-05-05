import { put, takeLatest, call } from 'redux-saga/effects'

import { signUpFail, ISignUpRequestAction, signUpSuccess } from "ac/auth";

import fb from "../firebase/firebase";
import { showNotification } from "utils/utils";
import { NOTIFICATION_ERROR, NOTIFICATION_PASSED } from "utils/constants";
import { LoginActionTypes } from "ac/constants";

function* signUp(action: ISignUpRequestAction) {
    const { email, password, name, nickname, surname } = action.payload;

    try {
        const user = yield call(fb.signUp, email, password);

        console.log('user', user);

        if (user.user) {
            const { uid } = user.user;

            yield call(fb.addNewUserToDB, {
                id: uid,
                name,
                surname,
                nickname,
                email
            });

            // yield call(fb.fetchUsers); // not allow now according with new secure rules

            yield put(signUpSuccess(user.user.email, user.user.refreshToken));

            showNotification(NOTIFICATION_PASSED, 'You are successfully signed up');
        } else {
            showNotification(NOTIFICATION_ERROR, 'Sign up failed! Please, try again!');
        }
    } catch (error) {
        const { code } = error;

        console.log('error', error);

        if (!code) {
            showNotification(NOTIFICATION_ERROR, 'Sign up failed! Please, try again!');

            return;
        }

        yield put(signUpFail(code));
    }
}

function* signUpSaga() {
    yield takeLatest(LoginActionTypes.SIGNUP_REQUEST, signUp);
}

export default signUpSaga;
