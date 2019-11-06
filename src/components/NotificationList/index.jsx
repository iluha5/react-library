import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

import Portal from 'components/Portal';

function NotificationList({ children }) {
    return (
        <Portal>
            <div className={style['NotificationList']}>
                {children}
            </div>
        </Portal>
    );
}

NotificationList.propTypes = {
    children: PropTypes.node,
};

export default NotificationList;
