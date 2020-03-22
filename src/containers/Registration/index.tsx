import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { SignUpRequestAction, signUpRequest } from 'ac/auth';

import Registration from 'components/Registration';
import Modal from 'components/Modal';
import Button from 'components/Button';

import AuthPattern from "components/AuthPattern";
import { rootState } from "reducers/index";
import { IUserState } from "reducers/user";

const ERRORS = {
    EMAIL_OCCUPIED: 'EMAIL_OCCUPIED',
    NICKNAME_OCCUPIED: 'NICKNAME_OCCUPIED',
    OTHER_DATA_ERROR: 'OTHER_DATA_ERROR',
    OTHER_ERROR: 'OTHER_ERROR',
};

interface IStateProps {
    user: IUserState,
}
interface IDispatchState {
    signUpRequest: (email: string, password: string) => SignUpRequestAction,
}

type Props = IStateProps & IDispatchState & RouteComponentProps;

interface IInvitedUserData {
    email: string,
    token: string,
}

interface IState {
    invitedUserData: IInvitedUserData | null,
    isFetched: boolean,
    isModal: boolean,
    isFetching: boolean,
    errors: string[],
    isSuccess: boolean,
}

export interface IMessages {
    otherDataError: string,
    emailOccupied: string,
    nickOccupied: string,
    otherError: string,
}

class RegistrationContainer extends React.Component<Props, IState> {
    readonly state = {
        invitedUserData: null,
        isFetched: false,
        isModal: false,
        isFetching: false,
        errors: [],
        isSuccess: false,
    };

    componentDidMount() {
        const searchParams = new URLSearchParams(location.search);
        let token = searchParams.get('token');
        let email = searchParams.get('email');

        if (token && email) {
            token = token.replace(/(<([^>]+)>)/ig, '');
            email = email.replace(/(<([^>]+)>)/ig, '');

            this.setState({
                invitedUserData: {
                    email,
                    token,
                },
            });
        }
    }

    static getDerivedStateFromProps(props: Props, state: IState) {
        const { user: { errorCode } } = props;
        const { errors } = state;

        if (errorCode) {
            switch (errorCode) {
                case 'auth/email-already-in-use':
                    if (errors.includes(ERRORS.EMAIL_OCCUPIED)) {
                        return null;
                    }

                    return {
                        errors: [...errors, ERRORS.EMAIL_OCCUPIED],
                    };
                default:
                    if (errors.includes(ERRORS.OTHER_DATA_ERROR)) {
                        return null;
                    }

                    return {
                      errors: [...errors, ERRORS.OTHER_DATA_ERROR],
                    };
            }
        }

        return null;
    }
    /**
     * Post registration form to backend
     * @param e
     * @private
     */
    private _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { signUpRequest } = this.props;
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        this.setState({
                errors: [],
            }, () => {
                if (email && password && typeof email === 'string' && typeof password === 'string') {
                    signUpRequest(email, password);
                }
            }
        );
    };

    /**
     * Close modal with errors
     * @private
     */
    private _handleClose = () => {
        this.setState({
            isModal: false,
            isFetched: false,
            isFetching: false,
            errors: [],
        });
    };

    /**
     * Get text form error code
     * @param {String} error
     * @param {Object} messages
     * @returns {string}
     * @private
     */
    static _getText(error: string, messages: IMessages) {
        switch (error) {
            case ERRORS.OTHER_DATA_ERROR:
                return messages.otherDataError;
            case ERRORS.EMAIL_OCCUPIED:
                return messages.emailOccupied;
            case ERRORS.NICKNAME_OCCUPIED:
                return messages.nickOccupied;
            case ERRORS.OTHER_ERROR:
                return messages.otherError;
            default:
                return '';
        }
    }

    render() {
        const { history, user } = this.props;
        const { isFetched, isFetching, isModal, errors, invitedUserData } = this.state;
        const modalSuccessRegistration = {
            header: 'Sign up',
            content: (
                <>
                    <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {'You have successfully signed up! We will send you a confirmation,\n so please check your email. If you cannot find it, please log in\n with your email/password and you will see the instructions. Thank you!'}
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <Button
                            onClick={() => history.push('/login')}
                        >
                            {'To Login'}
                        </Button>
                    </div>
                </>
            ),
        };
        const modalRegistrationHeader = 'Sign up';
        const errorsContent = {
            otherDataError: 'User cannot be created. Please, try again.',
            emailOccupied: 'This email is already in use!',
            nickOccupied: 'This nickname is already in use!',
            otherError: 'Request error! Please, try again later.',
        };

        return (
            <>
                <AuthPattern>
                    <Registration
                        onSubmit={this._handleSubmit}
                        errors={errors}
                        getErrorText={RegistrationContainer._getText}
                        invitedUserData={!invitedUserData ? invitedUserData : null}
                    />
                </AuthPattern>
                {
                    user.isFetched &&
                    <Modal
                        header={modalSuccessRegistration.header}
                        content={modalSuccessRegistration.content}
                    />
                }
                {
                    isModal && (errors.find(error => error === ERRORS.OTHER_DATA_ERROR)
                        || errors.find(error => error === ERRORS.OTHER_ERROR)) &&
                    <Modal
                        header={modalRegistrationHeader}
                        content={RegistrationContainer._getText(errors[0], errorsContent)}
                        handleClose={this._handleClose}
                    />
                }
                {
                    user.isFetching &&
                    <Modal isLoader/>
                }
            </>
        );
    }
}

const mapStateToProps = (state: rootState) => ({
   user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    signUpRequest: (email: string, password: string) => dispatch(signUpRequest(email, password)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer));
