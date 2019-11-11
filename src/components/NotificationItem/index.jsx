import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import style from './style.scss';

import cn from 'classnames';

import Icon from 'components/Icon';

class NotificationItem extends React.Component {
    /**
     * isShow: true - animated rendering, false - animated hiding
     * isImageLoading: if true - component doesn't render and wait for image loading
     * @type {{isShow: boolean, isImageLoading: boolean}}
     */
    state = {
        isShow: true,
        isImageLoading: true,
    };

    componentDidMount() {
        const { image } = this.props;

        if (!image) {
            this._renderItem();
            return;
        }

        const img = new Image();

        img.src = image;
        img.onload = this._renderItem;
    }

    componentWillUnmount() {
        clearTimeout(this._timeoutID);
    }

    /**
     * If image loading is finished, render the component
     * @private
     */
    _renderItem = () => {
        this.setState({
            isImageLoading: false,
        }, () => this._timeoutID = setTimeout(this._hide, 5000));
    };

    /**
     * Hide component with animation
     * @private
     */
    _hide = () => {
        const {onClose} = this.props;

        this.setState({
            isShow: false,
        }, () => setTimeout(onClose, 300));
    };

    /**
     * Click to item handler
     * @private
     */
    _handlerClick = () => {
        const { link, history } = this.props;

        clearTimeout(this._timeoutID);
        this._hide();

        if (link) history.push(link);
    };

    static _getIcon(type) {
        switch (type) {
            case 'Error':
                return (
                    <Icon
                        name={'mistakes-white'}
                        size={'xl'}
                    />
                );
            case 'Passing':
                return (
                    <Icon
                        name={'completed-white'}
                        size={'xl'}
                    />
                );
            default:
                break;
        }
    }

    render() {
        const { type, text, image } = this.props;
        const { isShow, isImageLoading } = this.state;

        if (isImageLoading) return null;

        return (
            <div
                className={
                    cn(style['NotificationItem'],
                        style[`NotificationItem_Type_${type}`],
                        isShow ? style['NotificationItem_Show'] : style['NotificationItem_Hide'],
                    )
                }
                onClick={this._handlerClick}
            >
                <div className={style['NotificationItem-Content']}>
                    {image ?
                        <div className={style['NotificationItem-Image']}>
                            <img src={image}/>
                        </div>
                        :
                        NotificationItem._getIcon(type)
                    }
                    <div className={style['NotificationItem-Text']}>
                        {text}
                    </div>
                </div>
            </div>
        );
    }
}

NotificationItem.propTypes = {
    type: PropTypes.oneOf(['Error', 'Passing']),
    link: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
};

export default withRouter(NotificationItem);
