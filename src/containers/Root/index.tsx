import React from 'react';
import AppRouter from "../../routers/AppRouter";
import NotificationContainer from 'containers/Notification';

class RootContainer extends React.Component {
    render() {
        return (
            <>
                <AppRouter/>
                <NotificationContainer/>
            </>
        );
    }
}

export default RootContainer;
