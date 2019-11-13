import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import style from './style.scss';

import Hint from 'components/Hint';

const styles = () => {
    return ({
        cssFocused: {},
        disabled: {},
        cssOutlinedInput_primary: {
            '&$cssFocused $notchedOutline': {
                borderColor: 'rgba(0, 208, 205, 0.5) !important',
                borderWidth: '2px',
            },
            '&$disabled $notchedOutline': {
                borderColor: '#4D5E79 !important',
                borderWidth: '1px',
                borderRadius: '3px',
            },
        },
        notchedOutline: {
            borderWidth: '1px',
            borderColor: 'rgb(33, 37, 41) !important',
        },
        error: {
            '& $notchedOutline': {
                borderColor: '#DA7163 !important',
                borderWidth: '2px',
            },
            '&$cssFocused $notchedOutline': {
                borderColor: '#DA7163 !important',
            },
        },
        formHelperText: {
            position: 'absolute',
            right: '-12px',
            top: '35px',
            color: '#DA7163 !important',
            fontFamily: 'OpenSans',
            fontWeight: '300',
            fontSize: '14px',
            textAlign: 'right',
        },
    });
};


class Input extends React.Component {
    state = {
        isModalHintVisible: false,
    };

    /**
     * Trigger showing modal hint
     * @private
     */
    _triggerModalHint = () => this.setState({isModalHintVisible: !this.state.isModalHintVisible});

    render() {
        const {
            size,
            inputType,
            type,
            className,
            disabled,
            onChange,
            isError,
            fullWidth,
            required,
            name,
            classes,
            InputProps,
            handlerInputRef,
            renderModalHint,
            modalHintData,
            ...rest
        } = this.props;
        const {isModalHintVisible} = this.state;

        return (
            <div className={cn(
                style['Input'],
                className,
            )}>
                <TextField
                    className={cn(
                        style['Input-TextField'],
                        style[`Input-TextField_size_${size}`],
                        style[`Input-TextField_type_${inputType}`],
                    )}
                    inputRef={handlerInputRef}
                    InputProps={{
                        classes: {
                            root: classes[`cssOutlinedInput_${inputType}`],
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                            error: classes.error,
                            disabled: classes.disabled,
                        },
                        ...InputProps,
                    }}
                    FormHelperTextProps={{
                        classes: {
                            root: classes.formHelperText,
                        },
                    }}

                    disabled={disabled}
                    onChange={onChange}
                    error={isError}
                    type={type}
                    variant="outlined"
                    fullWidth={fullWidth}
                    required={required}
                    name={name}

                    onFocus={this._triggerModalHint}
                    onBlur={this._triggerModalHint}

                    {...rest}
                />

                <Hint
                    className={style['Input-ModalHint']}
                    header={modalHintData ? modalHintData.header : null}
                    content={modalHintData ? modalHintData.content : null}
                    mount={isModalHintVisible && !!renderModalHint}
                />


            </div>
        );
    }
}

Input.defaultProps = {
    inputType: 'primary',
    size: 'm',
    disabled: false,
    fullWidth: true,
    required: true,
    type: 'text',
};

Input.propTypes = {
    className: PropTypes.any,
    inputType: PropTypes.string,
    type: PropTypes.string.isRequired,
    size: PropTypes.string,
    name: PropTypes.string.isRequired,
    classes: PropTypes.object,
    InputProps: PropTypes.object,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    handlerInputRef: PropTypes.func,
    isError: PropTypes.bool,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
    modalHintData: PropTypes.shape({
        header: PropTypes.string,
        content: PropTypes.string,
    }),
    renderModalHint: PropTypes.bool,
};

export default withStyles(styles)(Input);
