import * as React from 'react';

import Login from "components/Login";
import { showNotification } from "utils/utils";
import { NOTIFICATION_ERROR, NOTIFICATION_PASSED } from "utils/constants";
import fb from '../../firebase/firebase';

class LoginContainer extends React.Component {
    _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const password = formData.get('password') as string;
        const email = formData.get('email') as string;

        if (password && email) {
            fb.loginWithEmailAndPassword(email, password);
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
