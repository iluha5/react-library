import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

function Timer({ timeLeft, isNoStyles }) {
    if (isNoStyles) return (
        <div className={style['Timer-Time']}>
            <div>
                {Math.floor(timeLeft / 60)}
            </div>
            <div>:</div>
            <div>
                {timeLeft % 60 > 9  ? `${timeLeft % 60}` : `0${timeLeft % 60}`}
            </div>
        </div>
    );

    return (
        <div className={style['Timer']}>
            <div className={style['Timer-TimeWrapper']}>
                <div className={style['Timer-Title']}>
                    {'Time left'}
                </div>
                <div className={style['Timer-Time']}>
                    <div className={style['Timer-Amount']}>
                        {Math.floor(timeLeft / 60)}
                    </div>

                    &nbsp;&nbsp;

                    <div className={style['Timer-Amount']}>:</div>

                    &nbsp;&nbsp;

                    <div className={style['Timer-Amount']}>
                        {timeLeft % 60 > 9  ? `${timeLeft % 60}` : `0${timeLeft % 60}`}
                    </div>
                </div>
            </div>
        </div>
    );
}

Timer.propTypes = {
    timeLeft: PropTypes.number.isRequired,
    isNoStyles: PropTypes.bool,
};

export default Timer;
