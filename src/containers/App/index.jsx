import React from 'react';

import App from 'components/App';
import NotificationContainer from 'containers/Notification';
import { showNotification } from 'utils/utils';
import {
    REGEX_EMAIL,
    NOTIFICATION_ERROR,
    NOTIFICATION_PASSED,
    TIME_OVER,
    TEN_SECONDS_LEFT,
} from 'utils/constants';


class AppContainer extends React.Component {
    state = {
        isBox1Checked: false,
        isCheckboxModalOpen: false,
        timeLeft: 60,
        timerID: 0,
        isEmailErrors: false,
        email: '',
    };

    /**
     * Trigger checkbox state
     * @private
     */
    _triggerBox1 = () => {
        const { isBox1Checked } = this.state;

        this.setState({
            isBox1Checked: !isBox1Checked,
        });
    };

    /**
     * Show notification according with button type and notification type
     * @param btnType - type of the button
     * @param isPassed - true when it is passed notification, false - failed notification
     * @returns {Function}
     * @private
     */
    _handlerButtonClick = (btnType, isPassed) => () => {
        showNotification(
            isPassed ? NOTIFICATION_PASSED : NOTIFICATION_ERROR,
            `${btnType} button click!`
        );
    };

    /**
     * Trigger popup for checkbox button, checkbox click handler
     * @private
     */
    _triggerCheckboxButtonClick = () => {
        const { isCheckboxModalOpen } = this.state;

        this.setState({
            isCheckboxModalOpen: !isCheckboxModalOpen,
        });
    };

    /**
     * Time handler for 10 seconds and time over. Show according notification
     * @param type - type of time event
     * @returns {Function}
     * @private
     */
    _handlerTime = (type) => () => {
        switch (type) {
            case TIME_OVER:
                this.setState({
                    timeLeft: 0,
                }, () => showNotification(NOTIFICATION_ERROR, 'Time is over'));

                break;
            case TEN_SECONDS_LEFT:
                showNotification(NOTIFICATION_PASSED, 'Ten seconds left!');

                break;
            default:
                break;
        }
    };

    /**
     * Timer button click handler
     * @private
     */
    _handlerTimerButton = () => {
        this.setState({
            timeLeft: 15,
            isTimeOver: false,
            timerID: Math.random(),
        });
    };

        /**
         * Validate email field and set state
         * @param e
         * @private
         */
        _handlerEmailChange = (e) => {
            this.setState({
                email: e.target.value,
                isEmailErrors: !REGEX_EMAIL.test(e.target.value.trim().toLowerCase()),
            });
        };

        render() {
            const { isBox1Checked, timeLeft, timerID, isCheckboxModalOpen, isEmailErrors } = this.state;

            return (
            <>
                <App
                    handlerButtonClick={this._handlerButtonClick}
                    triggerCheckboxButtonClick ={this._triggerCheckboxButtonClick }
                    triggerBox1={this._triggerBox1}
                    isBox1Checked={isBox1Checked}
                    timeLeft={timeLeft}
                    handlerTime={this._handlerTime}
                    handlerTimeButtonClick={this._handlerTimerButton}
                    timerID={timerID}
                    isCheckboxModalOpen={isCheckboxModalOpen}
                    onEmailChange={this._handlerEmailChange}
                    isEmailErrors={isEmailErrors}
                />
                <NotificationContainer/>
            </>
            );
        }
}

AppContainer.propTypes = {
};

export default AppContainer;
