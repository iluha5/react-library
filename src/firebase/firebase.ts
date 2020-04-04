import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { config } from '../../env';
import {showNotification} from 'utils/utils';
import { NOTIFICATION_ERROR, NOTIFICATION_PASSED } from "utils/constants";
import UserCredential = firebase.auth.UserCredential;
import { store } from "store/index";

type IFirebaseConfig = typeof config;

class FirebaseService {
    constructor(fbConfig: IFirebaseConfig) {
        firebase.initializeApp(fbConfig);
        // this.fb = firebase;
    }

    fetchUsers = () => firebase.firestore()
        .collection('users')
        .get()
        .then((snapshot) => console.log('users', snapshot.docs.map(doc => ({...doc, id: doc.id}) )));

    // printUserStatus = () => {
    //     firebase
    //         .auth()
    //         .onAuthStateChanged(user => {
    //             if (user) {
    //                 console.log('user logged in: ', user);
    //             } else {
    //                 console.log('user logged out');
    //             }
    //         })
    // };

    subscribeUserStatus = (onUserLoggedIn: (user: any) => void, onUserNotLoggedIn: () => void) => {
        return firebase
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    console.log('user logged in', user);
                    onUserLoggedIn(user);
                } else {
                    console.log('user logged out');
                    onUserNotLoggedIn();
                }
            })
    };

    //
    // onPeopleChange = (callback) => this.fb.firestore()
    //     .collection('people')
    //     .onSnapshot(data => callback(processCollectionResponse(data)))

    loginWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
    };

    signUp = (email: string, password: string): Promise<UserCredential> => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
    };

    signOut = (): Promise<void> => {
        return firebase
            .auth()
            .signOut();
    }

    // isTokenExpire = () => {
    //     const user = firebase.auth().currentUser;
    //     const token = firebase.auth().currentUser ? firebase.auth().currentUser!.getIdToken() : null;
    //
    //     console.log('user', user);
    //     console.log('token', token);
    //
    //
    // }


}

// function processCollectionResponse(response) {
//     return response.docs.map(doc => ({ ...doc.data(), id: doc.id }))
// }

const fb = new FirebaseService(config);

export default fb;
