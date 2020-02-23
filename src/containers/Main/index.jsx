import React from 'react';

import Main from 'components/Main';
import {showNotification} from 'utils/utils';
import {
    REGEX_EMAIL,
    NOTIFICATION_ERROR,
    NOTIFICATION_PASSED,
    TIME_OVER,
    TEN_SECONDS_LEFT,
} from 'utils/constants';


class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this._wait = false;

        this.state = {
            isBox1Checked: false,
            isCheckboxModalOpen: false,
            isLoginModalOpen: false,
            timeLeft: 0,
            timerID: 0,
            isEmailErrors: false,
            email: '',
        };
    }

    /**
     * Trigger checkbox state
     * @private
     */
    _triggerBox1 = () => {
        const {isBox1Checked} = this.state;

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
        const {isCheckboxModalOpen} = this.state;

        this.setState({
            isCheckboxModalOpen: !isCheckboxModalOpen,
        });
    };

    /**
     * Trigger popup for Login form
     * @private
     */
    _triggerLoginButtonClick = () => {
        const {isLoginModalOpen} = this.state;

        this.setState({
            isLoginModalOpen: !isLoginModalOpen,
        });
    };

    /**
     * Time handler for 10 seconds and time over. Show according notification
     * @param type - type of time event
     * @returns {Function}
     * @private
     */
    _handlerTime = (type) => () => {
        if (!this._wait)
            switch (type) {
                case TIME_OVER:
                    this.setState({
                        timeLeft: 0,
                    }, () => showNotification(NOTIFICATION_ERROR, 'Time is over'));
                    this._wait = true;
                    setTimeout(() => this._wait = false, 1000);

                    break;
                case TEN_SECONDS_LEFT:
                    showNotification(NOTIFICATION_PASSED, 'Ten seconds left!');
                    this._wait = true;
                    setTimeout(() => this._wait = false, 1000);

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
        const {isBox1Checked, timeLeft, timerID, isCheckboxModalOpen, isEmailErrors, isLoginModalOpen} = this.state;

        return (
            <Main
                handlerButtonClick={this._handlerButtonClick}
                triggerCheckboxButtonClick={this._triggerCheckboxButtonClick}
                triggerBox1={this._triggerBox1}
                isBox1Checked={isBox1Checked}
                timeLeft={timeLeft}
                handlerTime={this._handlerTime}
                handlerTimeButtonClick={this._handlerTimerButton}
                timerID={timerID}
                isCheckboxModalOpen={isCheckboxModalOpen}
                onEmailChange={this._handlerEmailChange}
                isEmailErrors={isEmailErrors}
                isLoginModalOpen={isLoginModalOpen}
                handlerLoginClick={this._triggerLoginButtonClick}
            />
        );
    }
}

AppContainer.propTypes = {};

export default AppContainer;
