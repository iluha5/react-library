import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormEvent } from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import Icon from 'components/Icon';

import { REGEX_EMAIL } from 'utils/constants';
import style from './style.scss';

interface IProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
    className?: string,
}

interface IState {
    isRemember: boolean,
    email: string,
    password: string,
    isPasswordErrors: boolean,
    isEmailErrors: boolean,
    isEmailAutofill: boolean,
    isPasswordAutofill: boolean,
    isPasswordVisible: boolean,
}

type StateKeys = keyof IState;

class Login extends React.Component<IProps, IState> {
    readonly state = {
        isRemember: false,
        email: '',
        password: '',
        isPasswordErrors: false,
        isEmailErrors: false,
        isEmailAutofill: false,
        isPasswordAutofill: false,
        isPasswordVisible: false,
    };
    _emailRef = React.createRef<HTMLInputElement>();
    _passwordRef = React.createRef<HTMLInputElement>();

    componentDidMount() {
        // add animation listeners on inputs for catching autofill data (look at style.scss for details)
        this._emailRef.current!.addEventListener('animationstart', this._handleAnimationEmail, false);
        this._passwordRef.current!.addEventListener('animationstart', this._handleAnimationPassword, false);
    }

    componentWillUnmount() {
        this._emailRef.current!.removeEventListener('animationstart', this._handleAnimationEmail, false);
        this._passwordRef.current!.removeEventListener('animationstart', this._handleAnimationPassword, false);

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
    _handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
        this.setState({
            email: (e.target as HTMLInputElement).value,
            isEmailErrors: !REGEX_EMAIL.test((e.target as HTMLInputElement).value),
            isEmailAutofill: false,
            isPasswordAutofill: false,
        });
    };

    /**
     * Change password state and validation
     * @param e
     * @private
     */
    _handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
        this.setState({
            password: (e.target as HTMLInputElement).value,
            isPasswordErrors: (e.target as HTMLInputElement).value.length === 0,
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
    _handleViewClick = (prop: StateKeys) => () => {
        this.setState<never>({
            [prop]: !this.state[prop],
        });
        this._passwordRef.current!.focus();
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
        const { onSubmit } = this.props;


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
                        inputRef={this._emailRef}
                        className={style['Login-Input']}
                        endIcon={isEmailErrors ?
                            <Icon
                                name={'warning'}
                                size={'sm'}
                            />
                            :
                            undefined
                        }
                        renderModalHint={isEmailErrors}
                        modalHintData={{
                            header: 'Email',
                            content: 'Please, enter a valid email.',
                        }}
                    />
                    <Input
                        inputRef={this._passwordRef}
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

export default Login;
