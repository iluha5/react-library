import * as React from 'react';
import { FC, InputHTMLAttributes } from 'react';

// import * as style from './style.scss';
const style = require('./style.scss');

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
    id: string
}

const Checkbox: FC<IProps> =  ({id, ...rest}) => {
    // interface ITup {
    //     x: number;
    //     y?: string;
    // }
    //
    // const func = <X, Y>(x: X, y?: Y): [X, Y | undefined] => {
    //     return [x, y];
    // };
    //
    // type MyType = number | string;
    //
    // const func2 = (x?: MyType, y?: MyType) => {
    //     if (!x && !y) return ;
    //     if (!x || !y) return x || y;
    //
    //     return [x, y];
    // };
    //
    // func2(5);
    // func2(5, 'sss');
    // func2('sss');
    //
    // const makeTuple =  func(1);
    // console.log('makeTuple', makeTuple);
    //
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
