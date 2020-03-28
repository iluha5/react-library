import * as React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import style from './style.scss';

import Menu from "components/Menu";

interface IProps extends React.HTMLProps<HTMLElement> {
    isLoggedIn: boolean,
    onLogoutClick: () => void
}


const Header: React.FC<IProps> = ({ isLoggedIn, className, onLogoutClick }) => {
    return (
        <header className={cn(style.Header, className)}>
            <div className={cn('container', style['Header-Inner'])}>
                <Link className={style['Header-Link']} to={'/'}>
                    {/*<img className={style['Header-Logo']} src={logo} />*/}
                    <div className={style['Header-LogoText']}>HOME</div>
                </Link>
                <Menu onLogoutClick={onLogoutClick} loggedIn={isLoggedIn}/>
            </div>
        </header>
    );
};


export default Header;
