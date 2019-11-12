import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './style.scss';

import Icon from 'components/Icon';
import Portal from 'components/Portal';
import Loader from 'components/Loader';

class Modal extends React.Component {
    componentDidMount() {
        const { handleClose, withBodyScroll, isLoader } = this.props;

        if (handleClose) {
            document.addEventListener('mouseup', this._handlerClickOutside);
            document.addEventListener('keydown', this._handlerEscPress);
        }

        if (!withBodyScroll && !isLoader) document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        const { handleClose, withBodyScroll, isLoader } = this.props;

        if (handleClose) {
            document.removeEventListener('mouseup', this._handlerClickOutside);
            document.removeEventListener('keydown', this._handlerEscPress);
        }

        if (!withBodyScroll && !isLoader) document.body.style.overflow = 'auto';
    }

    /**
     * Handler for click outside modal div
     * @param event
     * @private
     */
    _handlerClickOutside = (event) => {
        const { handleClose } = this.props;

        if (!this._modalRef.contains(event.target)){
            handleClose();
        }
    };

    /**
     * Handler for esc press when the modal is rendered
     * @param event
     * @private
     */
    _handlerEscPress = (event) => {
        const { handleClose } = this.props;

        if (event.keyCode === 27){
            handleClose();
        }
    };

    render() {
        const { header, content, handleClose, isLoader, withoutSizes } = this.props;

        if (isLoader) return (
            <Portal>
                <div className={style['Modal']}>
                    <Loader/>
                </div>
            </Portal>
        );

        return (
            <Portal>
                <div
                    className={cn(
                        style['Modal'],
                        withoutSizes && style['Modal_WithoutSizes'])}
                >
                    <div
                        ref={refID => this._modalRef = refID}
                        className={style['Modal-Container']}
                    >
                        {header &&
                        <div className={style['Modal-Header']}>
                            {header}
                        </div>
                        }
                        {content &&
                        <div className={style['Modal-Content']}>
                            {content}
                        </div>
                        }
                        {handleClose &&
                        <button onClick={handleClose} className={style['Modal-Close']}>
                            <Icon
                                name={'close'}
                                size={'s'}
                            />
                        </button>
                        }
                    </div>
                </div>
            </Portal>
        );
    }
}

Modal.propTypes = {
    header: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    handleClose: PropTypes.func,
    isLoader: PropTypes.bool,
    withoutSizes: PropTypes.bool,
    withBodyScroll: PropTypes.bool,
};

export default Modal;
