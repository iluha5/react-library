import * as React from 'react';
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Login from "components/Login";
import AuthPattern from "components/AuthPattern";
import Modal from "components/Modal";

import { showNotification } from "utils/utils";
import { NOTIFICATION_ERROR } from "utils/constants";
import { signInRequest, SignInRequestAction } from "ac/auth";
import { rootState } from 'reducers/index';
import { IUserState } from "reducers/user";
import { Redirect } from "react-router";

interface IDispatchProps {
    signInRequest: (email: string, password: string) => SignInRequestAction
}

interface IStateProps {
    user: IUserState
}

type Props = IStateProps & IDispatchProps;

class LoginContainer extends React.Component<Props> {
    _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { signInRequest } = this.props;
        const formData = new FormData(e.currentTarget);
        const password = formData.get('password') as string;
        const email = formData.get('email') as string;

        if (password && email) {
            signInRequest(email, password);
        }
        else {
            showNotification(NOTIFICATION_ERROR, 'Something went wrong. Please, check email and password!');
        }
    };


    render() {
        const { user } = this.props;

        if (user.isFetched) {
            return <Redirect to={'/'}/>
        }

        return (
            <>
                {user.isFetching &&
                <Modal isLoader/>
                }
                <AuthPattern>
                    <Login
                        onSubmit={this._handleSubmit}
                    />
                </AuthPattern>
            </>
        );
    }
}

const mapStateToProps = (state: rootState) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signInRequest: (email: string, password: string) => dispatch(signInRequest(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

