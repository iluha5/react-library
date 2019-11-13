import React from 'react';

import style from './style.scss';

import MultiEmail from 'components/MultiEmail';
import cn from 'classnames';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Modal from 'components/Modal';
import {showNotification} from 'utils/utils';
import {NOTIFICATION_ERROR} from 'utils/constants';


class MultiEmailsExample extends React.Component {
    state = {
        users: [],
        isNewUserModalOpen: false,
        highlights: [],
        isEmailErrors: false,
        emails: [],
    };

    /**
     * Set email list
     * @param emails
     * @private
     */
    _setEmails = (emails) => {
        this.setState({
            emails: emails,
            isEmailErrors: false,
        });
    };

    /**
     * Close form
     * @private
     */
    _handlerCloseNewUser = () => {
        this.setState({
            isNewUserModalOpen: false,
            highlights: [],
        });
    };

    /**
     * Open form
     * @private
     */
    _handlerOpenNewUser = () => {
        this.setState({
            isNewUserModalOpen: true,
        });
    };

    _processNewUsers = () => {
        this.setState({
            highlights: [
                Math.random() > 0.5 ? 'Red' : 'Green',
                Math.random() > 0.5 ? 'Red' : null,
            ],
        }, () => showNotification(NOTIFICATION_ERROR, 'Something wrong with emails. Please, check the list!'));
    };


    render() {
        const { isNewUserModalOpen, highlights, emails, isEmailErrors } = this.state;

        const newUserModalData = {
            title: (
                <div className={style['ManagerUsersPage-AddUsersHeader']}>
                    Multiple emails input
                </div>
            ),
            content: (
                <>
                    <div className={style['ManagerUsersPage-AddUsersSubHeader']}>
                        Enter or paste one or several emails. Use enter, spaces, commas or semicolons as a separator.
                    </div>

                    {highlights.length !== 0 &&
                    <div className={style['ManagerUsersPage-AddUsersLegend']}>
                        <span className={style['ManagerUsersPage-AddUsersLegendItem']}>
                        email already in the base
                        </span>
                        <span className={style['ManagerUsersPage-AddUsersLegendItem']}>
                        email already in use
                        </span>
                    </div>
                    }

                    <div className={style['AddUserForm']}>
                        <div className={style['AddUserForm-InputWrapper']}>
                            <MultiEmail
                                placeholder='Input an email'
                                emails={emails}
                                highlights={highlights}
                                onChange={(emails) => {
                                    this._setEmails(emails);
                                }}
                                getLabel={(
                                    email,
                                    index,
                                    removeEmail,
                                    color,
                                ) => {
                                    return (
                                        <div
                                            data-email-tag
                                            key={index}
                                            className={cn(
                                                style['AddUserForm-EmailLabel'],
                                                color && style[`AddUserForm-EmailLabel_Color_${color}`],
                                            )}
                                        >
                                            <div className={style['AddUserForm-EmailLabelText']}>
                                                {email}
                                            </div>
                                            <span
                                                data-email-tag-handle
                                                onClick={() => removeEmail(index)}
                                            >
                                                    ×
                                            </span>
                                        </div>
                                    );
                                }}
                            />
                        </div>
                        <div className={style['AddUserForm-UsersAmount']}>
                            {emails.length}&nbsp;
                            <Icon
                                name='user-white'
                                size='s'
                            />
                        </div>
                    </div>
                    <div className={style['AddUserForm-Control']}>
                        <Button
                            className={style['AddUserForm-Button']}
                            btnType={'secondary'}
                            type='button'
                            onClick={this._handlerCloseNewUser}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={style['AddUserForm-Button']}
                            onClick={this._processNewUsers}
                            disabled={isEmailErrors || emails.length === 0}
                        >
                            Process emails
                        </Button>
                    </div>
                </>
            ),
        };


        return (
            <div>
                <Button
                    onClick={this._handlerOpenNewUser}
                    btnType='success'
                >
                    Open multiple emails form
                </Button>

                {isNewUserModalOpen &&
                    <Modal
                        header={newUserModalData.title}
                        content={newUserModalData.content}
                        handleClose={this._handlerCloseNewUser}
                        withoutSizes
                    />
                }
            </div>
        );
    }
}

MultiEmailsExample.propTypes = {};

export default MultiEmailsExample;
