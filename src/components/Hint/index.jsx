import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './style.scss';
import Paper from 'components/Paper';
import withAnimation from 'containers/WithAnimation';

export function Hint({ header, content, className }){
    return (
        <Paper
            className={cn(
                style['Hint'],
                className
            )}
            background={'rgb(247, 247, 249)'}
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
        </Paper>
    );
}

Hint.propTypes = {
    header: PropTypes.string,
    content: PropTypes.string,
    className: PropTypes.string,
};

export default withAnimation(Hint);
