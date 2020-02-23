import * as React from 'react';
import cn from 'classnames';

import style from './style.scss';

import Icon from 'components/Icon';
import Portal from 'components/Portal';
import Loader from 'components/Loader';

interface IProps {
    handleClose?: () => void;
    header?: string | React.ReactNode;
    content?: string | React.ReactNode;
    isLoader?: boolean;
    withoutSizes?: boolean;
    withBodyScroll?: boolean;
}

class Modal extends React.Component<IProps> {
    private _modalRef = React.createRef<HTMLDivElement>();
    private _bodyOriginalMarginRight: string;
    private _bodyOriginalOverflow: string;

    componentDidMount() {
        const { handleClose, withBodyScroll, isLoader } = this.props;

        if (handleClose) {
            document.addEventListener('mouseup', this._handlerClickOutside);
            document.addEventListener('keydown', this._handlerEscPress);
        }

        if (!withBodyScroll && !isLoader) {
            this._bodyOriginalMarginRight = document.body.style.marginRight;
            this._bodyOriginalOverflow = document.body.style.overflow;

            document.body.style.marginRight =  `${window.innerWidth - document.body.clientWidth}px`;
            document.body.style.overflow = 'hidden';
        }
    }

    componentWillUnmount() {
        const { handleClose, withBodyScroll, isLoader } = this.props;

        if (handleClose) {
            document.removeEventListener('mouseup', this._handlerClickOutside);
            document.removeEventListener('keydown', this._handlerEscPress);
        }

        if (!withBodyScroll && !isLoader) {
            document.body.style.overflow = this._bodyOriginalOverflow;
            document.body.style.marginRight = this._bodyOriginalMarginRight;
        }
    }

    /**
     * Handler for click outside modal div
     * @param event
     * @private
     */
    private _handlerClickOutside = (event: MouseEvent) => {
        const { handleClose } = this.props;

        if (this._modalRef.current && !this._modalRef.current.contains(event.target as Element) && handleClose){
            handleClose();
        }
    };

    /**
     * Handler for esc press when the modal is rendered
     * @param event
     * @private
     */
    private _handlerEscPress = (event: KeyboardEvent) => {
        const { handleClose } = this.props;

        if (event.keyCode === 27 && handleClose){
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
                        ref={this._modalRef}
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

export default Modal;
