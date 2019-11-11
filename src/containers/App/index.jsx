import React from 'react';

import App from 'components/App';
import NotificationContainer from 'containers/Notification';
import { showNotification } from 'utils/utils';
import { NOTIFICATION_ERROR, NOTIFICATION_PASSED, TIME_OVER, TEN_SECONDS_LEFT } from 'utils/constants';


class AppContainer extends React.Component {
    state = {
        isBox1Checked: false,
        timeLeft: 60,
        timerID: 0,
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

    _handlerTimerButton = () => {
        this.setState({
            timeLeft: 15,
            isTimeOver: false,
            timerID: Math.random(),
        });
    };

    render() {
        const { isBox1Checked, timeLeft, timerID } = this.state;

        return (
            <>
                <App
                    handlerButtonClick={this._handlerButtonClick}
                    triggerBox1={this._triggerBox1}
                    isBox1Checked={isBox1Checked}
                    timeLeft={timeLeft}
                    handlerTime={this._handlerTime}
                    handlerTimeButtonClick={this._handlerTimerButton}
                    timerID={timerID}
                />
                <NotificationContainer/>
            </>
        );
    }
}

AppContainer.propTypes = {
};

export default AppContainer;
