import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/firestore'
import { config, IFirebaseConfig } from '../firebase-config'
import {showNotification} from 'utils/utils';
import { NOTIFICATION_ERROR, NOTIFICATION_PASSED } from "utils/constants";

class FirebaseService {
    constructor(fbConfig: IFirebaseConfig) {
        firebase.initializeApp(fbConfig);
        // this.fb = firebase;
    }

    // fetchPeople = () => this.fb.firestore()
    //     .collection('people')
    //     .get()
    //     .then(processCollectionResponse)
    //
    // onPeopleChange = (callback) => this.fb.firestore()
    //     .collection('people')
    //     .onSnapshot(data => callback(processCollectionResponse(data)))

    loginWithEmailAndPassword = (email: string, password: string): void => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                showNotification(NOTIFICATION_PASSED, 'You are successfully logged in, with email: ' + email)
            })
            .catch(() => showNotification(NOTIFICATION_ERROR, 'Login failed! Please, try later!'));

    }


}

// function processCollectionResponse(response) {
//     return response.docs.map(doc => ({ ...doc.data(), id: doc.id }))
// }

const fb = new FirebaseService(config);

export default fb;
