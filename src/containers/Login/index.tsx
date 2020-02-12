import * as React from 'react';

import * as firebase from "firebase/app";
import * as firebaseui from 'firebaseui'

import "firebase/analytics";
import "firebase/auth";

import Login from 'components/Login';

const firebaseConfig = {
    apiKey: "AIzaSyAwKNKE3B-k7vpli1rCVH7QOBmGiBDwVXE",
    authDomain: "orderbase-e062c.firebaseapp.com",
    databaseURL: "https://orderbase-e062c.firebaseio.com",
    projectId: "orderbase-e062c",
    storageBucket: "orderbase-e062c.appspot.com",
    messagingSenderId: "1013530626525",
    appId: "1:1013530626525:web:fbe3397f1bda25c0158e34",
    measurementId: "G-7VLN2BF95R"
};

const uiConfig = {
    signInSuccessUrl: `${window.location.protocol}//${window.location.hostname}/`,
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: `${window.location.protocol}//${window.location.hostname}/`,
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
        window.location.assign(`${window.location.protocol}//${window.location.hostname}/`);
    }
};


firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


class LoginContainer extends React.Component {
    render() {
        return (<div id={'firebaseui-auth-container'}></div>);
    }
}

export default LoginContainer;
