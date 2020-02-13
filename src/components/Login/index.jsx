import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './style.scss';

import { REGEX_EMAIL } from 'utils/constants';

import Input from 'components/Input';
import Icon from 'components/Icon';
import Button from 'components/Button';

// interface IProps extends React.HTMLProps<HTMLDivElement> {
//     onSubmit: () => void,
// }

// class Login extends React.Component<IProps> {
class Login extends React.Component {
    state = {
        isRemember: false,
        email: '',
        password: '',
        isPasswordErrors: false,
        isEmailErrors: false,
        isEmailAutofill: false,
        isPasswordAutofill: false,
        isPasswordVisible: false,
    };

    componentDidMount() {
        // add animation listeners on inputs for catching autofill data (look at style.scss for details)
        this._emailRef.addEventListener('animationstart', this._handleAnimationEmail, false);
        this._passwordRef.addEventListener('animationstart', this._handleAnimationPassword, false);
    }

    componentWillUnmount() {
        this._emailRef.removeEventListener('animationstart', this._handleAnimationEmail, false);
        this._passwordRef.removeEventListener('animationstart', this._handleAnimationPassword, false);

    }

    /**
     * Autofill password firing check
     * @private
     */
    _handleAnimationPassword = () => {
        this.setState({
            isPasswordAutofill: true,
        });
    };

    /**
     * Autofill email firing check
     * @private
     */
    _handleAnimationEmail = () => {
        this.setState({
            isEmailAutofill: true,
        });
    };

    /**
     * Change email state and validation
     * @param e
     * @private
     */
    _handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
            isEmailErrors: !REGEX_EMAIL.test(e.target.value),
            isEmailAutofill: false,
            isPasswordAutofill: false,
        });
    };

    /**
     * Change password state and validation
     * @param e
     * @private
     */
    _handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
            isPasswordErrors: e.target.value.length === 0,
            isEmailAutofill: false,
            isPasswordAutofill: false,
        });
    };

    /**
     * Toggle view icon by click
     * @param prop
     * @returns {Function}
     * @private
     */
    _handleViewClick = (prop) => () => {
        this.setState({
            [prop]: !this.state[prop],
        });
        this._passwordRef.focus();
    };


    render() {
        const {
            isEmailErrors,
            email,
            isPasswordVisible,
            isPasswordAutofill,
            isEmailAutofill,
            password,
            isPasswordErrors,
        } = this.state;
        const {onSubmit} = this.props;


        return (
            <div className={style['Login']}>
                <div className={style['Login-Hint']}>Login</div>
                <form onSubmit={onSubmit}>
                    <Input
                        autoFocus
                        onChange={this._handleEmailChange}
                        error={isEmailErrors}
                        placeholder={'Input Email'}
                        name='email'
                        type='email'
                        inputRef={(inputRef) => this._emailRef = inputRef}
                        className={style['Login-Input']}
                        endIcon={isEmailErrors &&
                        <Icon
                            name={'warning'}
                            size={'sm'}
                        />
                        }
                        renderModalHint={isEmailErrors}
                        modalHintData={{
                            header: 'Email',
                            content: 'Please, enter a valid email.',
                        }}
                    />
                    <Input
                        inputRef={(inputRef) => this._passwordRef = inputRef}
                        className={style['Login-Input']}
                        name="password"
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder={'Enter password'}
                        error={isPasswordErrors}
                        onChange={this._handlePasswordChange}

                        endIcon={isPasswordVisible ?
                            <Icon
                                className={style['Login-Input_ViewIcon']}
                                name={'view-accent'}
                                size={'s'}
                                onClick={this._handleViewClick('isPasswordVisible')}/>
                            :
                            <Icon
                                className={style['Login-Input_ViewIcon']}
                                name={'view'}
                                size={'s'}
                                onClick={this._handleViewClick('isPasswordVisible')}/>
                        }

                        renderModalHint={isPasswordErrors}
                        modalHintData={{
                            header: 'Enter your password',
                        }}
                    />
                    <div className={style['Login-Utils']}>
                        <Link to="/forgot" className={style['Login-Link']}>{'Forgot your password?'}</Link>
                    </div>
                    <Button
                        className={style['Login-Btn']}
                        disabled={(isEmailErrors || !email.trim() || isPasswordErrors || password.length === 0)
                        && !(isPasswordAutofill && isEmailAutofill)}
                    >
                        {'Login'}
                    </Button>
                    <div className={style['Login-RegistrationContainer']}>
                        <span>{'Do not have an account?'}</span>
                        <Link to="/registration" className={style['Login-Link']}>{'Signup'}</Link>
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Login;
