import * as React from 'react';

import cn from 'classnames';

import style from './style.scss';

import {Link} from 'react-router-dom';
import Menu from "components/Menu";

interface IProps extends React.HTMLProps<HTMLElement>{
    isLoggedIn: boolean,
}

function Header({ isLoggedIn, className }: IProps){
    return (
        <header className={cn(style.Header, className)}>
            <div className={cn('container', style['Header-Inner'])}>
                <Link className={style['Header-Link']} to={
                    isLoggedIn ?
                    '/courses'
                    :
                    '/'
                }>
                    {/*<img className={style['Header-Logo']} src={logo} />*/}
                    <div className={style['Header-LogoText']}>HOME</div>
                </Link>
                {!isLoggedIn &&
                    <Menu />
                }
                {/*{isLoggedIn &&*/}
                    {/*<>*/}
                    {/*</>*/}
                {/*}*/}
            </div>
        </header>
    );
}

export default Header;
