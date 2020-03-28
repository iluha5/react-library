import React from 'react';
import AppRouter from "../../routers/AppRouter";
import NotificationContainer from 'containers/Notification';
import cn from 'classnames';
import AuthRouter from 'routers/AuthRouter'

import style from './style.scss';
import HeaderContainer from "containers/Header";
import { rootState } from "reducers/index";
import { connect } from "react-redux";

interface IStateProps {
    userToken: string,
}

class RootContainer extends React.Component<IStateProps> {
    render() {
        const { userToken } = this.props;

        return (
            <div className={cn(
                style['Root'],
                !userToken && style['Root-AuthFull'],
            )}>
                <HeaderContainer isLoggedIn={!!userToken}/>
                {userToken ?
                    <AppRouter/>
                    :
                    <AuthRouter/>
                }
                <NotificationContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state: rootState) => ({
    userToken: state.user.data.token,
});

export default connect(mapStateToProps)(RootContainer);
