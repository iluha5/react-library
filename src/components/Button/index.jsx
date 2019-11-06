import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './style.scss';

function Button ({btnType, className, size, children,  ...rest}) {
    return (
        <button
            className={cn(
                style.Btn,
                style[`Btn_size_${size}`],
                style[`Btn_type_${btnType}`],
                className,
            )}
            {...rest}
        >
            <span className={style['Btn-Label']}>{children}</span>
        </button>
    );
}

Button.defaultProps = {
    btnType: 'primary',
    size: 'm',
    disabled: false,
};

Button.propTypes = {
    className: PropTypes.any,
    btnType: PropTypes.oneOf(['primary', 'secondary', 'success', 'link', 'fake']),
    size: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    onClick: PropTypes.any,
};

export default Button;
