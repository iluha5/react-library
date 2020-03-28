import React from 'react';
import {connect} from 'react-redux';
import { Dispatch } from "redux";

import { logoutRequest, LogoutRequestAction } from "ac/auth";

import Header from 'components/Header';

interface IDispatchProps {
    logoutRequest: () => LogoutRequestAction
}

interface IProps {
    isLoggedIn: boolean,
}

type Props = IProps & IDispatchProps;

class HeaderContainer extends React.Component<Props> {
    private _logoutHandler = () => {
        const { logoutRequest } = this.props;

        logoutRequest();
    };

    render() {
        const { isLoggedIn } = this.props;

        return (<Header
            isLoggedIn={isLoggedIn}
            onLogoutClick={this._logoutHandler}
        />);
    }
}

const mapDispatchToProps = (dispatch: Dispatch<LogoutRequestAction>) => {
    return {
        logoutRequest: () => dispatch(logoutRequest()),
    };
};

export default connect(undefined, mapDispatchToProps)(HeaderContainer);
