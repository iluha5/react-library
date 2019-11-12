import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './style.scss';
// import Paper from 'components/Paper';
import withAnimation from 'containers/WithAnimation';

function Hint({ header, content, className }){
    return (
        <div
            className={cn(
                style['Hint'],
                className
            )}
            // background={'#4D5E79'}
        >
            {header &&
                <div className={style['Hint-Header']}>
                    {header}
                </div>
            }
            {content &&
                <div className={style['Hint-Content']}>
                    {content}
                </div>
            }
        </div>
    );
}

Hint.propTypes = {
    header: PropTypes.string,
    content: PropTypes.string,
    className: PropTypes.string,
};

export default withAnimation(Hint);
