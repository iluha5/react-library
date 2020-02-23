import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { NOTIFICATION_ERROR, NOTIFICATION_PASSED } from 'utils/constants';

import {removeNotification} from 'ac/notifications';

import NotificationList from 'components/NotificationList';
import NotificationItem from 'components/NotificationItem';


class NotificationContainer extends React.Component {
    /**
     * rendering - object with notifications which are rendering now. Each notification
     *  is available by unique key received from counter
     * counter - needed for construct unique key id for rendered components
     * @type {{counter: number, rendering: {}}}
     */
    state = {
        counter: 0,
        rendering: {},
    };

    componentDidMount() {
        this._pushDataToState();
    }

    componentDidUpdate(prevProps) {
        const {shouldRender} = this.props;

        if ((prevProps !== this.props) && shouldRender) {
            this._pushDataToState();
        }
    }

    /**
     * Put notification data to container's state, using unique id (counter) and remove
     * the notification from the store
     * @private
     */
    _pushDataToState() {
        const { shouldRender, type, data, removeNotification } = this.props;
        const { rendering, counter } = this.state;

        if (shouldRender) {
            this.setState({
                rendering: {
                    ...rendering,
                    [counter]: {
                        ...data,
                        type: type,
                        renderID: counter,
                    },
                },
                counter: counter + 1,
            }, () => {
                removeNotification();
            });
        }
    }

    /**
     * Get type for NotificationItem from notification type
     * @param type
     * @returns {string}
     * @private
     */
    static _getItemType(type) {
        switch (type) {
            case NOTIFICATION_PASSED:
                return 'Passing';
            case NOTIFICATION_ERROR:
                return 'Error';
            default:
                return '';
        }
    }

    /**
     * Fired when notification closing, remove notification from state
     * @param renderID
     * @returns {Function}
     * @private
     */
    _handleCloseNotification = (renderID) => () => {
        const {rendering} = this.state;

        let newRendering = {...rendering};

        delete newRendering[renderID];

        this.setState({
            rendering: {
                ...newRendering,
            },
        });
    };

    render() {
        const { rendering } = this.state;

        const list = Object.keys(rendering).map(renderID =>
            <NotificationItem
                key={renderID}
                type={NotificationContainer._getItemType(rendering[renderID].type)}
                image={rendering[renderID]['image']}
                text={rendering[renderID].title}
                onClose={this._handleCloseNotification(renderID)}
            />
        );

        return (
            <NotificationList>
                {
                    list
                }
            </NotificationList>
        );
    }
}

NotificationContainer.propTypes = {
    shouldRender: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        message: PropTypes.string,
        image: PropTypes.string,
        name: PropTypes.string,
    }),
    removeNotification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    shouldRender: state.notification.shouldRender,
    type: state.notification.type,
    data: state.notification.data,
});

const mapDispatchToProps = (dispatch) => ({
    removeNotification: () => dispatch(removeNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
