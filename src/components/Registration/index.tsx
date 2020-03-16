import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormEvent } from 'react';
import { isEqual, isEmpty } from 'lodash-es';

import {
    NAME_INPUT_MAX_LENGTH,
    PASSWORD_INPUT_MAX_LENGTH,
    REGEX_EMAIL,
    REGEX_NAME,
    REGEX_NICKNAME,
    REGEX_PASSWORD,
} from 'utils/constants';

import style from './style.scss';

import { IMessages } from 'containers/Registration';
import Button from 'components/Button';
import Input from 'components/Input';
import Icon from 'components/Icon';

const ERRORS = {
    EMAIL_OCCUPIED: 'EMAIL_OCCUPIED',
    NICKNAME_OCCUPIED: 'NICKNAME_OCCUPIED',
};

interface IProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
    errors: string[],
    getErrorText: (error: string, messages: IMessages) => string,
    invitedUserData: {
        email: string,
        token: string,
    } | null
}

interface IState {
    name: string,
    surname: string,
    nickname: string,
    email: string,
    password: string,
    confirmedPassword: string,
    isPasswordsErrors: boolean,
    isEmailErrors: boolean,
    isNicknameErrors: boolean,
    isNameErrors: boolean,
    isSurnameErrors: boolean,
    errors: string[],
    isSubmit: boolean,
    isPasswordsVisible: boolean,
}

type StateKeys = keyof IState;

class Registration extends React.Component<IProps, IState> {
    readonly state = {
        name: ' ',
        surname: ' ',
        nickname: ' ',
        email: '',
        password: '',
        confirmedPassword: '',
        isPasswordsErrors: false,
        isEmailErrors: false,
        isNicknameErrors: false,
        isNameErrors: false,
        isSurnameErrors: false,
        errors: this.props.errors || [],
        isSubmit: false,
        isPasswordsVisible: false,
    };
    _confirmPasswordRef = React.createRef<HTMLInputElement>();
    _passwordRef = React.createRef<HTMLInputElement>();

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (!isEqual(this.props.errors, prevProps.errors) || prevState.isSubmit) {
            this.setState({
                errors: this.props.errors,
                isSubmit: false,
            });
        }
    }

    /**
     * Set state according with field name
     * @param e
     * @private
     */
    private _handleChange = (e: FormEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        const name = (e.target as HTMLInputElement).name;

        if (!REGEX_NAME.test(value)) {
            this.setState<never>({
                [name]: (e.target as HTMLInputElement).value,
                [`is${name.charAt(0).toUpperCase() + name.slice(1)}Errors`]: true,
            });
        } else {
            this.setState<never>({
                [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
                [`is${name.charAt(0).toUpperCase() + name.slice(1)}Errors`]: false,
            });
        }
    };

    /**
     * Validate nickname field and set state
     * @param e
     * @private
     */
    private _handleNicknameChange = (e: FormEvent<HTMLInputElement>) => {
        const nickname = (e.target as HTMLInputElement).value;
        const { errors } = this.state;
        console.log('nickname', nickname);

        if (!REGEX_NICKNAME.test(nickname)) {
            this.setState({
                nickname: (e.target as HTMLInputElement).value,
                isNicknameErrors: true,
                errors: errors.filter(e => e !== ERRORS.NICKNAME_OCCUPIED),
            });
        } else {
            this.setState({
                nickname: (e.target as HTMLInputElement).value,
                isNicknameErrors: false,
                errors: errors.filter(e => e !== ERRORS.NICKNAME_OCCUPIED),
            });
        }
    };

    /**
     * Validate email field and set state
     * @param e
     * @private
     */
    private _handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
        const email = (e.target as HTMLInputElement).value.trim().toLowerCase();
        const { errors } = this.state;

        if (!REGEX_EMAIL.test(email)) {
            this.setState({
                email: (e.target as HTMLInputElement).value,
                isEmailErrors: true,
                errors: errors.filter(e => e !== ERRORS.EMAIL_OCCUPIED),
            });
        } else {
            this.setState({
                email: (e.target as HTMLInputElement).value,
                isEmailErrors: false,
                errors: errors.filter(e => e !== ERRORS.EMAIL_OCCUPIED),
            });
        }
    };

    /**
     * Validate confirm password field and set state
     * @param e
     * @private
     */
    private _handleConfirmPasswordChange = (e: FormEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;

        if (value !== this.state.password || !REGEX_PASSWORD.test(value)) {
            this.setState({
                confirmedPassword: value,
                isPasswordsErrors: true,
            });
        } else {
            this.setState({
                confirmedPassword: value,
                isPasswordsErrors: false,
            });
        }
    };

    /**
     * Validate password field and set state
     * @param e
     * @private
     */
    private _handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;

        if (value !== this.state.confirmedPassword || !REGEX_PASSWORD.test(value)) {
            this.setState({
                password: value,
                isPasswordsErrors: true,
            });
        } else {
            this.setState({
                password: value,
                isPasswordsErrors: false,
            });
        }
    };

    /**
     * Set state when main button clicked
     * @private
     */
    private _handleBtnClick = () => {
        this.setState({
            isSubmit: true,
        });
    };

    /**
     * Toggle view icon by click
     * @param prop
     * @param fieldName
     * @returns {Function}
     * @private
     */
    private _handleViewClick = (prop: StateKeys, fieldName: string) => () => {
        this.setState<never>({
            [prop]: !this.state[prop],
        });

        if (fieldName === 'password') {
            this._passwordRef.current!.focus();
        } else {
            this._confirmPasswordRef.current!.focus();
        }
    };


    render() {
        const { onSubmit, getErrorText, invitedUserData } = this.props;
        const {
            name,
            surname,
            nickname,
            email,
            isPasswordsErrors,
            isEmailErrors,
            isNameErrors,
            isSurnameErrors,
            isNicknameErrors,
            confirmedPassword,
            password,
            errors,
            isPasswordsVisible,
        } = this.state;

        const errorsContent = {
            otherDataError: 'User cannot be created. Please, try again.',
            emailOccupied: 'This email is already in use!',
            nickOccupied: 'This nickname is already in use!',
            otherError: 'Request error! Please, try again later.',
        };


        return (
            <div className={style['Registration']}>
                <div className={style['Registration-Hint']}>
                    {'Signup'}
                </div>
                <form onSubmit={onSubmit} autoComplete='off'>
                    <Input
                        error={isNicknameErrors || (!!errors.find(e => e === ERRORS.NICKNAME_OCCUPIED))}
                        className={style['Registration-Input']}
                        name="nickname"
                        placeholder={'Nickname'}
                        onChange={this._handleNicknameChange}
                        autoFocus

                        endIcon={(isNicknameErrors || (errors.find(e => e === ERRORS.NICKNAME_OCCUPIED))) ?
                            <Icon
                                name={'warning'}
                                size={'sm'}
                            />
                            :
                            undefined
                        }

                        maxLength={PASSWORD_INPUT_MAX_LENGTH}

                        helperText={
                            (errors.find(e => e === ERRORS.NICKNAME_OCCUPIED))
                            && getErrorText(ERRORS.NICKNAME_OCCUPIED, errorsContent)
                        }

                        renderModalHint={isNicknameErrors}
                        modalHintData={{
                            header: 'Enter your nickname',
                            content: 'Nickname may contain Latin letters and numbers, underscore, and hyphen. Your nickname must contain 1-32 characters and start with a letter.',
                        }}
                    />

                    <Input
                        error={isNameErrors}
                        className={style['Registration-Input']}
                        name="name"
                        placeholder={'Name'}
                        onChange={this._handleChange}
                        endIcon={isNameErrors ?
                            <Icon
                                name={'warning'}
                                size={'sm'}
                            />
                            :
                            undefined
                        }
                        maxLength={NAME_INPUT_MAX_LENGTH}

                        renderModalHint={isNameErrors}
                        modalHintData={{
                            header: 'Enter your first name',
                            content: 'First name may contain Latin letters and numbers. First name must contain 1-64 characters and start with a letter.',
                        }}
                    />
                    <Input
                        error={isSurnameErrors}
                        className={style['Registration-Input']}
                        name="surname"
                        placeholder={'Surname'}
                        onChange={this._handleChange}
                        endIcon={isSurnameErrors ?
                            <Icon
                                name={'warning'}
                                size={'sm'}
                            />
                            :
                            undefined
                        }
                        maxLength={NAME_INPUT_MAX_LENGTH}

                        renderModalHint={isSurnameErrors}
                        modalHintData={{
                            header: 'Enter your last name',
                            content: 'Last name may contain Latin letters and numbers. Last name must contain 1-64 characters and start with a letter.',
                        }}
                    />
                    <Input
                        error={isEmailErrors || (!!errors.find(e => e === ERRORS.EMAIL_OCCUPIED))}
                        className={style['Registration-Input']}
                        type="email"
                        name="email"
                        placeholder={invitedUserData ? invitedUserData.email : 'Email'}
                        onChange={this._handleEmailChange}
                        endIcon={(isEmailErrors || (errors.find(e => e === ERRORS.EMAIL_OCCUPIED))) ?
                            <Icon
                                name={'warning'}
                                size={'sm'}
                            />
                            :
                            undefined
                        }
                        helperText={
                            (errors.find(e => e === ERRORS.EMAIL_OCCUPIED))
                            && getErrorText(ERRORS.EMAIL_OCCUPIED, errorsContent)
                        }

                        renderModalHint={isEmailErrors}
                        modalHintData={{
                            header: 'Enter your email',
                            content: 'Please, enter a valid email.',
                        }}
                        disabled={!!invitedUserData}
                    />
                    <Input
                        inputRef={this._passwordRef}
                        error={isPasswordsErrors}
                        className={style['Registration-Input']}
                        type={isPasswordsVisible ? 'text' : 'password'}
                        name="password"
                        autoComplete="new-password"
                        placeholder={'Password'}
                        onChange={this._handlePasswordChange}
                        endIcon={isPasswordsVisible ?
                            <Icon
                                className={style['Registration-Input_ViewIcon']}
                                name={'view-accent'}
                                size={'s'}
                                onClick={this._handleViewClick('isPasswordsVisible', 'password')}/>
                            :
                            <Icon
                                className={style['Registration-Input_ViewIcon']}
                                name={'view'}
                                size={'s'}
                                onClick={this._handleViewClick('isPasswordsVisible', 'password')}/>
                        }
                        maxLength={PASSWORD_INPUT_MAX_LENGTH}

                        renderModalHint={isPasswordsErrors}
                        modalHintData={{
                            header: 'Enter your password',
                            content: 'Your password must contain Latin letters, numbers, and special characters: "@$!%*#?&,.-+()[]{}_/". \n Your password must contain 8-32 characters and at least 1 uppercase letter, 1 lowercase letter and 1 number or 1 special character.',
                        }}
                    />
                    <Input
                        inputRef={this._confirmPasswordRef}
                        error={isPasswordsErrors}
                        className={style['Registration-Input']}
                        type={isPasswordsVisible ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder={'Confirm password'}
                        onChange={this._handleConfirmPasswordChange}
                        endIcon={isPasswordsVisible ?
                            <Icon
                                className={style['Registration-Input_ViewIcon']}
                                name={'view-accent'}
                                size={'s'}
                                onClick={this._handleViewClick('isPasswordsVisible', 'confirmPassword')}/>
                            :
                            <Icon
                                className={style['Registration-Input_ViewIcon']}
                                name={'view'}
                                size={'s'}
                                onClick={this._handleViewClick('isPasswordsVisible', 'confirmPassword')}/>
                        }
                        maxLength={PASSWORD_INPUT_MAX_LENGTH}

                        renderModalHint={isPasswordsErrors}
                        modalHintData={{
                            header: 'Confirm your password',
                            content: 'Entered passwords must match.',
                        }}
                    />

                    <Button
                        className={style['Registration-Btn']}
                        disabled={isPasswordsErrors
                        || !confirmedPassword.trim()
                        || !password.trim()
                        || !name.trim()
                        || !surname.trim()
                        || !nickname.trim()
                        || !email.trim() && (!invitedUserData || isEmpty(invitedUserData))
                        || isEmailErrors && (!invitedUserData || isEmpty(invitedUserData))
                        || isNicknameErrors
                        || (errors.length !== 0)
                        || isNameErrors
                        || isSurnameErrors}

                        onClick={this._handleBtnClick}
                    >
                        {'Sign up'}
                    </Button>

                    <div className={style['Registration-Login']}>
                        <Link className={style['Registration-Link']} to="/login">{'Log in'}</Link>
                    </div>
                </form>
            </div>
        );
    }
}


export default Registration;
