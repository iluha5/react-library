import React from 'react';

import App from 'components/App';
import NotificationContainer from 'containers/Notification';
import { showNotification } from 'utils/utils';
import { NOTIFICATION_ERROR} from 'utils/constants';


class AppContainer extends React.Component {
    _handlerButtonClick = () =>
        showNotification(
            NOTIFICATION_ERROR,
            'This is Error Notification!'
        );


    render() {
        return (
            <>
                <App
                    buttonClick={this._handlerButtonClick}
                />
                <NotificationContainer/>
            </>
        );
    }
}

AppContainer.propTypes = {
};

export default AppContainer;
