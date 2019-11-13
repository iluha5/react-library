import React from 'react';
import { isEmailFn } from 'utils/utils';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './style.scss';

/**
 * Render form for input multi emails
 */
class MultiEmail extends React.Component {
    constructor(props) {
        super(props);

        /**
         * focused: if form is focused,
         * emails: inputed emails list,
         * inputValue: string (email) in input (not tagged)
         * highlights: array with colors - for highlighting emails labels
         * isHighlightInput: true if text into input should be highlighted
         * @type {{focused: boolean, emails: Array, inputValue: string, highlights: Array, isHighlightInput: boolean}}
         */
        this.state = {
            focused: false,
            emails: [],
            highlights: [],
            inputValue: '',
            isHighlightInput: false,
        };

        this.emailInputRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        const { highlights } = this.props;

        if (highlights !== prevProps.highlights) {
            this.setState({
                highlights: highlights || [],
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.propsEmails !== nextProps.emails) {
            return {
                propsEmails: nextProps.emails || [],
                emails: nextProps.emails || [],
                inputValue: '',
            };
        }

        return null;
    }

    _addHighlightToInput = () => {
        this.setState({
            isHighlightInput: true,
        });
    };

    _removeHighlightFromInput = () => {
        this.setState({
            isHighlightInput: false,
        });
    };

    /**
     * Find email in value string and add it to email list
     * @param value
     * @param isEnter
     * @private
     */
    _findEmailAddress = (value, isEnter) => {
        const { validateEmail, onChange } = this.props;
        const { emails } = this.state;
        let validEmails = [];
        let inputValue = '';
        const re = /[ ,;]/g;
        const isEmail = validateEmail || isEmailFn;

        /**
         * Add an email to the list if it isn't there
         * @param email
         * @returns {boolean}
         */
        const addEmails = (email) => {
            const _emails = emails;

            for (let i = 0, l = _emails.length; i < l; i++) {
                if (_emails[i] === email) {
                    return false;
                }
            }

            validEmails.push(email);

            return true;
        };

        if (value !== '') {
            if (re.test(value)) {
                let arr = value.split(re).filter(n => {
                    return n !== '' && n !== undefined && n !== null;
                });

                do {
                    if (isEmail('' + arr[0])) {
                        addEmails('' + arr.shift());
                    }
                    else {
                        if (arr.length === 1) {
                            /// inputValue
                            inputValue = '' + arr.shift();
                            this._addHighlightToInput();
                        }
                        else {
                            arr.shift();
                        }
                    }
                } while (arr.length);
            }
            else {
                if (isEnter) {
                    if (isEmail(value)) {
                        addEmails(value);
                    }
                    else {
                        inputValue = value;
                        this._addHighlightToInput();
                    }
                }
                else {
                    inputValue = value;
                }
            }
        }

        this.setState({
            emails: [...emails, ...validEmails],
            inputValue: inputValue,
        });

        if (validEmails.length && onChange) {
            onChange([...emails, ...validEmails]);
        }
    };

    /**
     * Find email in value
     * @param value
     * @private
     */
    _onChangeInputValue = (value) => {
        this._removeHighlightFromInput();
        this._findEmailAddress(value);
    };

    /**
     * Remove email from list by index and fire user onChange
     * @param index
     * @private
     */
    _removeEmail = (index) => {
        const { emails, highlights } = this.state;
        const { onChange } = this.props;

        this.setState(
            {
                emails: [
                    ...emails.slice(0, index),
                    ...emails.slice(index + 1),
                ],
                highlights: [
                    ...highlights.slice(0, index),
                    ...highlights.slice(index + 1),
                ],
            }, () => {
                if (onChange) {
                    onChange(this.state.emails);
                }
            });
    };

    /**
     * Keydown handler
     * @param e
     * @private
     */
    _handleOnKeydown = (e) => {
        const { emails } = this.state;

        switch (e.which) {
            case 13:
                e.preventDefault();
                break;
            case 8:
                if (!e.currentTarget.value) {
                    this._removeEmail(emails.length - 1);
                }
                break;
            default:
                break;
        }
    };

    /**
     * Keyup handler
     * @param e
     * @private
     */
    _handleOnKeyup = (e) => {
        switch (e.which) {
            case 13:
                this._findEmailAddress(e.currentTarget.value, true);
                break;
            default:
                break;
        }
    };

    /**
     * Input onchange handler
     * @param e
     * @private
     */
    _handleOnChange = (e) => this._onChangeInputValue(e.currentTarget.value);

    /**
     * Input onblur handler
     * @param e
     * @private
     */
    _handleOnBlur = (e) => {
        this.setState({
            focused: false,
        });
        this._findEmailAddress(e.currentTarget.value, true);
    };

    /**
     * Input onfocus handler
     * @private
     */
    _handleOnFocus = () => this.setState({
        focused: true,
    });

    render() {
        const { focused, emails, inputValue, highlights, isHighlightInput } = this.state;
        const { style: outerStyle, getLabel, className = '', placeholder } = this.props;

        return (React.createElement(
            'div',
            {
                className: `${className} ${style['ReactMultiEmail']}` +
                    ` ${focused ? style['ReactMultiEmail_Focused'] : ''}`,
                style: outerStyle,
                onClick: () => {
                    if (this.emailInputRef.current) {
                        this.emailInputRef.current.focus();
                    }
                },
            },
            emails.map((email, index) => {
                return getLabel(
                    email,
                    index,
                    this._removeEmail,
                    highlights && highlights[index] ? highlights[index] : undefined,
                );
            }),
            React.createElement(
                'input',
                {
                    ref: this.emailInputRef,
                    type: 'text',
                    value: inputValue,
                    onFocus: this._handleOnFocus,
                    onBlur: this._handleOnBlur,
                    onChange: this._handleOnChange,
                    onKeyDown: this._handleOnKeydown,
                    onKeyUp: this._handleOnKeyup,
                    placeholder: placeholder,
                    className: cn(
                        style['ReactMultiEmail-Input'],
                        isHighlightInput && style['ReactMultiEmail-Input_Highlighted']
                    ),
                },
            ),
        ));
    }
}

MultiEmail.propTypes = {
    style: PropTypes.object,
    getLabel: PropTypes.func.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    emails: PropTypes.arrayOf(
        PropTypes.string,
    ),
    onChange: PropTypes.func,
    validateEmail: PropTypes.func,
    highlights: PropTypes.arrayOf(PropTypes.string),
};

export default MultiEmail;
