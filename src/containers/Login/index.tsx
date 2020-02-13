import * as React from 'react';

// import * as firebase from "firebase/app";
// import * as firebaseui from 'firebaseui'
// import "firebase/analytics";
// import "firebase/auth";

import { config } from '../../firebase-config';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import Login from "components/Login";
import { showNotification } from "utils/utils";
import { NOTIFICATION_ERROR, NOTIFICATION_PASSED } from "utils/constants";

const db = firebase.initializeApp(config);

const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [{
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    }],
    tosUrl: '/'
};


// const uiConfig = {
//     signInSuccessUrl: `${window.location.protocol}//${window.location.hostname}/`,
//     signInOptions: [
//         // Leave the lines as is for the providers you want to offer your users.
//         firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     ],
//     // tosUrl and privacyPolicyUrl accept either url string or a callback
//     // function.
//     // Terms of service url/callback.
//     tosUrl: () => {
//     },
//     // Privacy policy url/callback.
//     privacyPolicyUrl: () => {
//     }
// };


class LoginContainer extends React.Component {

    componentDidMount() {
        console.log('firebase', firebase);

        // const ui = new firebaseui.auth.AuthUI(firebase.auth());
        // ui.start('#firebaseui-auth-container', uiConfig);

        // firebase.initializeApp(firebaseConfig);
        //
        // // Initialize the FirebaseUI Widget using Firebase.
        // const ui = new firebaseui.auth.AuthUI(firebase.auth());
        //
        // // The start method will wait until the DOM is loaded.
        // ui.start('#firebaseui-auth-container', uiConfig);
    }

    _handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (formData.get('password') && formData.get('email')) {
            showNotification(NOTIFICATION_PASSED, 'Login success!');

            // loginAC(formData)
            //     .catch((err) => {
            //         if (err.response.status === 401) {
            //             if (err.response.data.message === 'Email is not verified') {
            //                 this.setState({
            //                     isConfirmEmailPage: true,
            //                     email: formData.get('email'),
            //                 });
            //             } else {
            //                 this.setState({
            //                     isModal: true,
            //                     error: 401,
            //                 });
            //             }
            //         } else {
            //             this.setState({
            //                 isModal: true,
            //                 error: ERRORS.OTHER,
            //             });
            //             throw new Error(err);
            //         }
            //
            //     });
        }
        else {
            showNotification(NOTIFICATION_ERROR, 'Something went wrong. Please, check email and password!');
        }
    };


    render() {
        return (
            <Login
                onSubmit={this._handleSubmit}
            />
        );
    }
}

export default LoginContainer;
