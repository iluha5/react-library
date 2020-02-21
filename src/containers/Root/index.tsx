import React from 'react';
import AppRouter from "../../routers/AppRouter";
import NotificationContainer from 'containers/Notification';
import cn from 'classnames';

import style from './style.scss';
import Header from "components/Header";

const loggedIn = false; //stub

class RootContainer extends React.Component {
    render() {
        return (
            <div className={cn(
                style['Root'],
                !loggedIn && style['Root-AuthFull'],
            )}>
                <Header isLoggedIn={loggedIn}/>
                <AppRouter/>
                <NotificationContainer/>
            </div>
        );
    }
}

export default RootContainer;
