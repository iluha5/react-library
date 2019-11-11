import React from 'react';
import PropTypes from 'prop-types';

import worker from './worker';
import WebWorker from 'utils/workerSetup';

import Timer from 'components/Timer';


class TimerContainer extends React.Component {
    state = {
        isTimeOver: false,
        timeLeft: this.props.timeLeft,
    };

    componentDidMount() {
        const {timeLeft} = this.state;

        if (window.Worker) {
            this._worker = new WebWorker(worker);

            this._worker.postMessage({
                type: 'start',
                timeLeft: timeLeft,
            });

            this._worker.addEventListener('message', this._setTimer);
        }
    }

    componentWillUnmount() {
        this._worker.postMessage({
            type: 'stop',
        });

        this._worker.terminate();
    }

    componentDidUpdate(prevProps) {
        const {isTimeOver, timeLeft} = this.state;
        const {onTimeOver, trigger} = this.props;

        if ((prevProps.timeLeft !== this.props.timeLeft) && !isTimeOver) {
            this._worker.postMessage({
                type: 'update',
                timeLeft: this.props.timeLeft,
            });
        }

        if (trigger && timeLeft === trigger.time) {
            trigger.callback();
        }

        if (isTimeOver) {
            this._worker.terminate();

            onTimeOver();

            this.setState({
                isTimeOver: false,
            });
        }
    }

    /**
     * Set timeLeft and isTimeOver states from worker
     * @param e
     * @private
     */
    _setTimer = (e) => {
        const { onTickCallback } = this.props;

        if (e.data.isTimeOver) {
            this.setState({
                isTimeOver: true,
            });
        } else {
            this.setState({
                timeLeft: e.data.timeLeft,
            }, () => {
                if (onTickCallback) {
                    onTickCallback(e.data.timeLeft);
                }
            });
        }

    };

    render() {
        const {timeLeft} = this.state;
        const {isNoStyles} = this.props;

        return (
            <Timer timeLeft={timeLeft} isNoStyles={isNoStyles} />
        );
    }
}

TimerContainer.propTypes = {
    timeLeft: PropTypes.number.isRequired,
    onTimeOver: PropTypes.func.isRequired,
    isNoStyles: PropTypes.bool,
    trigger: PropTypes.shape({
        time: PropTypes.number.isRequired,
        callback: PropTypes.func.isRequired,
    }),
    onTickCallback: PropTypes.func,
};


export default TimerContainer;
