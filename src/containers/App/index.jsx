import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {updateNotification} from 'ac/notifications';
import {NOTIFICATION_ERROR} from 'utils/constants';

import App from 'components/App';
import NotificationContainer from 'containers/Notification';


class AppContainer extends React.Component {

    _showNotification = () => {
        const {updateNotification} = this.props;
        // debugger

        updateNotification(
            NOTIFICATION_ERROR,
            {
                title: 'This is Error Notification!',
            },
        );

    };

    render() {
        return (
            <>
                <App
                    showNotification={this._showNotification}
                />
                <NotificationContainer/>
            </>
        );
    }
}

AppContainer.propTypes = {
    updateNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateNotification: (type, data) => dispatch(updateNotification(type, data)),
    };
};

export default connect(null, mapDispatchToProps)(AppContainer);
