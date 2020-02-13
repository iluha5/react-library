import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import cn from 'classnames';

import {TIME_OVER, TEN_SECONDS_LEFT} from 'utils/constants';
import style from './style.scss';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import TimerContainer from 'containers/Timer';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Icon from 'components/Icon';
import MultiEmailsExample from 'components/MultiEmailsExample';
import LoginContainer from 'containers/Login';

function App({
    handlerButtonClick,
    triggerBox1,
    isBox1Checked,
    timeLeft,
    handlerTime,
    triggerCheckboxButtonClick,
    timerID,
    isCheckboxModalOpen,
    handlerTimeButtonClick,
    isEmailErrors,
    onEmailChange,
    handlerLoginClick,
    isLoginModalOpen,
    history,
}) {
    const checkboxModalData = {
        header: 'Important message',
        content: 'I\'m popup message. Try to close me with mouse or keyboard. Bye!',
    };

    const loginModalData = {
        header: 'Login',
        content: <LoginContainer/>,
    };

    return (
        <div className={style['App']}>
            <h2 className={style['App-Title']}>
                Buttons and Notifications.
            </h2>
            <h3 className={style['App-SubTitle']}>
                Try to click them.
            </h3>
            <div className={style['App-Line']}>
                <div className={style['App-Item']}>
                    <Button
                        onClick={handlerButtonClick('Primary', true)}
                    >
                        Primary
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={handlerButtonClick('Secondary', false)}
                        btnType={'secondary'}
                    >
                        Secondary
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={handlerButtonClick('Success', true)}
                        btnType={'success'}
                    >
                        Success
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={handlerButtonClick('Fake', false)}
                        btnType={'fake'}
                    >
                        Fake
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={handlerButtonClick('Link', true)}
                        btnType={'link'}
                    >
                        Link
                    </Button>
                </div>
            </div>
            <h2 className={style['App-Title']}>
                Custom Checkboxes and Popups.
            </h2>
            <h3 className={style['App-SubTitle']}>
                Try it!
            </h3>
            <div className={style['App-Line']}>
                <div className={style['App-Item']}>
                    <Checkbox
                        id='box1'
                        onChange={triggerBox1}
                    />
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={triggerCheckboxButtonClick}
                        disabled={!isBox1Checked}
                    >
                        Open popup
                    </Button>
                </div>
            </div>
            <h2 className={style['App-Title']}>
                Custom Input with Animated Hints.
            </h2>
            <h3 className={style['App-SubTitle']}>
                Input some email.
            </h3>
            <div className={style['App-Line']}>
                <div className={cn(style['App-Item'], style['App-EmailWrapper'])}>
                    <Input
                        error={isEmailErrors}
                        className={style['App-EmailInput']}
                        type='email'
                        name='email'
                        placeholder='Type an email'
                        onChange={onEmailChange}
                        endIcon={isEmailErrors &&
                        <Icon
                            name={'warning'}
                            size={'sm'}
                        />
                        }
                        renderModalHint={isEmailErrors}
                        modalHintData={{
                            header: 'Enter an email',
                            content: 'Please, enter a valid email',
                        }}
                    />
                </div>
            </div>
            <h2 className={style['App-Title']}>
                WebWorker Timer.
            </h2>
            <h3 className={style['App-SubTitle']}>
                Click to start the timer.
            </h3>
            <div className={style['App-Line']}>
                <div className={cn(style['App-Item'], style['App-TimerWrapper'])}>
                    <TimerContainer
                        key={timerID}
                        timeLeft={timeLeft}
                        onTimeOver={timeLeft !== 0 ? handlerTime(TIME_OVER) : () => {
                        }}
                        trigger={{
                            time: 10,
                            callback: handlerTime(TEN_SECONDS_LEFT),
                        }}
                    />
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={handlerTimeButtonClick}
                        disabled={timeLeft !== 0}
                    >
                        Take 15 sec
                    </Button>
                </div>
            </div>
            <h2 className={style['App-Title']}>
                Multiple Emails Input.
            </h2>
            <h3 className={style['App-SubTitle']}>
                Open the input.
            </h3>
            <div className={style['App-Line']}>
                <div className={cn(style['App-Item'], style['App-MultiEmailsWrapper'])}>
                    <MultiEmailsExample/>
                </div>
            </div>
            <h2 className={style['App-Title']}>
                Login form.
            </h2>
            <h3 className={style['App-SubTitle']}>
                {/*Please login with <strong>test@test.test</strong> and <strong>11111111</strong>*/}
                Try to login.
            </h3>
            <div className={style['App-Line']}>
                <div className={style['App-Item']}>
                    <Button
                        // onClick={handlerLoginClick}
                        onClick={() => history.push('/login')}
                    >
                        Go to login form
                    </Button>
                </div>
            </div>

            {isCheckboxModalOpen &&
            <Modal
                header={checkboxModalData.header}
                content={checkboxModalData.content}
                handleClose={triggerCheckboxButtonClick}
            />
            }

            {isLoginModalOpen &&
            <Modal
                header={loginModalData.header}
                content={loginModalData.content}
                handleClose={handlerLoginClick}
            />
            }
        </div>
    );
}

App.propTypes = {
    handlerButtonClick: PropTypes.func.isRequired,
    triggerBox1: PropTypes.func.isRequired,
    isBox1Checked: PropTypes.bool.isRequired,
    isCheckboxModalOpen: PropTypes.bool.isRequired,
    isEmailErrors: PropTypes.bool.isRequired,
    timeLeft: PropTypes.number.isRequired,
    handlerTime: PropTypes.func.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    handlerTimeButtonClick: PropTypes.func.isRequired,
    triggerCheckboxButtonClick: PropTypes.func.isRequired,
    timerID: PropTypes.number.isRequired,
    handlerLoginClick: PropTypes.func.isRequired,
    isLoginModalOpen: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default withRouter(App);
