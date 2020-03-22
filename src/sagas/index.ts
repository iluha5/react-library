import { all } from 'redux-saga/effects'

import signInSaga from "sagas/signIn";
import logoutSaga from "sagas/logout";
import signUpSaga from "sagas/signUp";

export default function* rootSaga() {
    yield all([
        signInSaga(),
        signUpSaga(),
        logoutSaga(),
    ])
}
