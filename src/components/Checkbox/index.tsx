import * as React from 'react';
import { FC, InputHTMLAttributes } from 'react';

// import * as style from './style.scss';
const style = require('./style.scss');

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
    id: string
}

const Checkbox: FC<IProps> =  ({id, ...rest}) => {
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
};

export default Checkbox;
