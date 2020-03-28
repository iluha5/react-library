import * as React from 'react';
import cn from 'classnames';

import style from './style.scss';

interface IProps extends React.HTMLProps<HTMLButtonElement> {
    btnType?: 'primary' | 'secondary' | 'success' | 'link' | 'fake',
    btnSize?: 'm' | 'xs',
    type?: 'button' | 'submit' | 'reset' | undefined
}

const Button: React.FC<IProps> = ({ btnType = 'primary', className, btnSize = 'm', children, ...rest }) => {
    return (
        <button
            className={cn(
                style.Btn,
                style[`Btn_size_${btnSize}`],
                style[`Btn_type_${btnType}`],
                className,
            )}
            {...rest}
        >
            <span className={style['Btn-Label']}>{children}</span>
        </button>
    );
};

export default Button;
