import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './style.scss';

const Paper = forwardRef((props, ref) => {
    const {
        depth,
        background,
        style: propStyle,
        children,
        onClick,
        className,
    } = props;
    const classes = cn(
        style.paper,
        style[`paper_depth_${depth}`],
        className);
    const inlineStyles = Object.assign(
        {},
        {
            background: background,
        },
        propStyle
    );

    return (
        <div
            ref={ref}
            style={inlineStyles}
            className={classes}
            onClick={onClick}
        >
            {children}
        </div>
    );
});

Paper.defaultProps = {
    depth: 1,
    background: '#455673',
};

Paper.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    depth: PropTypes.number.isRequired,
    background: PropTypes.string.isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func,
};

export default Paper;
