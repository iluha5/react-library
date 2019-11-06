import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './style.scss';

// eslint-disable-next-line react/display-name
const Icon = (props) => {
    const {name, dataUrl, size, className, onClick} = props;
    let url = '';
    name ? url = dataUrl ? require(`../../icons/${name}.svg?raw`) : require(`../../icons/${name}.svg`) : null;

    const classNames = cn(
        style.Icon,
        style[`Icon_Size_${size}`],
        className
    );

    return <span
        className={classNames}
        style={{backgroundImage: `url(${url})`}}
        onClick={onClick}
    />;
};

Icon.defaultProps = {
    size: 'm',
};

Icon.propTypes = {
    className: PropTypes.any,
    dataUrl: PropTypes.bool,
    icon: PropTypes.string,
    size: PropTypes.oneOf(['xs', 's', 'sm', 'm', 'l', 'xl', 'xxl']),
    name: PropTypes.string,
    onClick: PropTypes.func,
};

export default Icon;
