import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { SignUpRequestAction, signUpRequest } from 'ac/auth';

import Registration from 'components/Registration';
import Modal from 'components/Modal';
import Button from 'components/Button';

import { getDeepProp } from 'utils/utils';
import { httpResponseCodes } from 'utils/constants';
import AuthPattern from "components/AuthPattern";

const ERRORS = {
    EMAIL_OCCUPIED: 'EMAIL_OCCUPIED',
    NICKNAME_OCCUPIED: 'NICKNAME_OCCUPIED',
    OTHER_DATA_ERROR: 'OTHER_DATA_ERROR',
    OTHER_ERROR: 'OTHER_ERROR',
};

interface IDispatchState {
    signUpRequest: (email: string, password: string) => SignUpRequestAction,
}

type Props = IDispatchState & RouteComponentProps;

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

    /**
     * Post registration form to backend
     * @param e
     * @private
     */
    private _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { invitedUserData } = this.state;
        const formData = new FormData(e.currentTarget);

        formData.delete('confirmPassword');

        if (invitedUserData) {
            formData.append('email', (invitedUserData! as IInvitedUserData).email);
            formData.append('token', (invitedUserData! as IInvitedUserData).token);
        }

        this.setState({
                isFetching: true,
                errors: [],
            }, () => console.log('registration request')
            // () => dataApi
            //     .post('registration', undefined, formData)
            //     .then(() => {
            //         this.setState({
            //             isFetching: false,
            //             isFetched: true,
            //         });
            //     })
            //     .catch(e => {
            //         let errors: string[] = [];
            //
            //         if (getDeepProp(e, 'response.data.data.nickname')) errors.push(ERRORS.NICKNAME_OCCUPIED);
            //         if (getDeepProp(e, 'response.data.data.email')) errors.push(ERRORS.EMAIL_OCCUPIED);
            //
            //         if (errors.length !== 0) {
            //             this.setState({
            //                 errors: [...errors],
            //                 isModal: true,
            //                 isFetching: false,
            //             });
            //
            //             return;
            //         }
            //
            //         if (getDeepProp(e, 'response.status') === httpResponseCodes.HTTP_422) {
            //             this.setState({
            //                 errors: [ERRORS.OTHER_DATA_ERROR],
            //                 isModal: true,
            //                 isFetching: false,
            //             });
            //             return;
            //         }
            //
            //         this.setState({
            //             errors: [ERRORS.OTHER_ERROR],
            //             isModal: true,
            //             isFetching: false,
            //         });
            //     }),
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
        const { history } = this.props;
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
                    isFetched &&
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
                    isFetching &&
                    <Modal isLoader/>
                }
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    signUpRequest: (email: string, password: string) => dispatch(signUpRequest(email, password)),
});

export default withRouter(connect(null, mapDispatchToProps)(RegistrationContainer));
