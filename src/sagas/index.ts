import { all } from 'redux-saga/effects'

import signInSaga from "sagas/signIn";
import logoutSaga from "sagas/logout";

export default function* rootSaga() {
    yield all([
        signInSaga(),
        logoutSaga()
    ])
}
