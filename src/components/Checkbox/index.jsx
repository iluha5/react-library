import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

function Checkbox({id, ...rest}) {
    return (
        <div className={style['Checkbox']} >
            <input
                type="checkbox"
                id={id}
                {...rest}
            />
            <label
                htmlFor={id}
            >
            </label>
        </div>
    );
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Checkbox;
