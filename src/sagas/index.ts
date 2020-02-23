import {all} from 'redux-saga/effects'
import signInSaga from "sagas/signIn";

export default function * rootSaga() {
    yield all([
        signInSaga()
        // peopleSaga()
    ])
}
