import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './style.scss';

import Hint from 'components/Hint';


class Input extends React.Component {
    state = {
        isModalHintVisible: false,
        isInputActive: false,
    };

    /**
     * Show modal hint and show active input border color
     * @private
     */
    _onInputFocus = () => {
        this.setState({
            isModalHintVisible: true,
            isInputActive: true,
        });
    };

    /**
     * Hide modal hint and show defauld input border color
     * @private
     */
    _onInputBlur = () => {
        this.setState({
            isModalHintVisible: false,
            isInputActive: false,
        });
    };


    render() {
        const {
            error,
            className,
            inputRef,
            renderModalHint,
            modalHintData,
            endIcon,
            helperText,
            disabled,
            ...rest
        } = this.props;
        const {isModalHintVisible, isInputActive} = this.state;

        return (

            <div className={cn(
                style['Input'],
                isInputActive && style['Input_Type_Active'],
                error && style['Input_Type_Error'],
                disabled && style['Input_Type_Disabled'],
                className
            )}>
                <input
                    className={style['Input-InputText']}
                    ref={inputRef}
                    disabled={disabled}

                    onFocus={this._onInputFocus}
                    onBlur={this._onInputBlur}

                    {...rest}
                />
                {endIcon &&
                    <div className={style['Input-IconWrapper']}>
                        {endIcon}
                    </div>
                }
                {helperText &&
                    <div className={style['Input-HelperText']}>
                        {helperText}
                    </div>
                }

                <div className={style['Input-ModalHint']}>
                    <Hint
                        header={modalHintData ? modalHintData.header : null}
                        content={modalHintData ? modalHintData.content : null}
                        mount={isModalHintVisible && !!renderModalHint}
                    />
                </div>
            </div>
        );
    }
}

Input.propTypes = {
    className: PropTypes.string,
    error: PropTypes.bool,
    inputRef: PropTypes.func,
    helperText: PropTypes.string,
    modalHintData: PropTypes.shape({
        header: PropTypes.string,
        content: PropTypes.string,
    }),
    renderModalHint: PropTypes.bool,
    disabled: PropTypes.bool,
    endIcon: PropTypes.node,
};

export default Input;
