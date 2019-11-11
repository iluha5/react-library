import React from 'react';

import App from 'components/App';
import NotificationContainer from 'containers/Notification';
import { showNotification } from 'utils/utils';
import {NOTIFICATION_ERROR, NOTIFICATION_PASSED} from 'utils/constants';


class AppContainer extends React.Component {
    state = {
        isBox1Checked: false,
    };

    _triggerBox1 = () => {
        const { isBox1Checked } = this.state;

        this.setState({
            isBox1Checked: !isBox1Checked,
        });
    };

    _handlerButtonClick = (btnType, isPassed) => () => {
        showNotification(
            isPassed ? NOTIFICATION_PASSED : NOTIFICATION_ERROR,
            `${btnType} button click!`
        );
    };

    // _handlerSecondaryButtonClick = () => showNotification(
    //         NOTIFICATION_ERROR,
    //         'Secondary button click!'
    //     );
    //
    // _handlerSuccessButtonClick = () => showNotification(
    //         NOTIFICATION_PASSED,
    //         'Success button click!'
    //     );
    //
    // _handlerFakeButtonClick = () => showNotification(
    //         NOTIFICATION_ERROR,
    //         'Fake button click!'
    //     );
    //
    // _handlerLinkButtonClick = () => showNotification(
    //         NOTIFICATION_PASSED,
    //         'Link click!'
    //     );


    render() {
        const { isBox1Checked } = this.state;

        return (
            <>
                <App
                    handlerButtonClick={this._handlerButtonClick}
                    // buttonHandlers={{
                    //     primary: this._handlerPrimaryButtonClick,
                    //     secondary: this._handlerSecondaryButtonClick,
                    //     success: this._handlerSuccessButtonClick,
                    //     fake: this._handlerFakeButtonClick,
                    //     link: this._handlerLinkButtonClick,
                    // }}
                    triggerBox1={this._triggerBox1}
                    isBox1Checked={isBox1Checked}
                />
                <NotificationContainer/>
            </>
        );
    }
}

AppContainer.propTypes = {
};

export default AppContainer;
