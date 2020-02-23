import React from 'react';

import { NavLink } from 'react-router-dom';

import style from './style.scss';

import Button from 'components/Button';

interface IProps {
    loggedIn: boolean,
    onLogoutClick: () => void
}

const Menu: React.FC<IProps> = ({ loggedIn, onLogoutClick }) => {
    if (loggedIn) {
        return (
            <ul className={style.Menu}>
                <li className={style['Menu-Item']}>
                    <NavLink
                        className={style['Menu-Link']}
                        activeClassName={style['Menu-Link_Active']}
                        to={'/'}
                        exact
                    >
                        Library
                    </NavLink>
                    <Button onClick={onLogoutClick} btnType={'link'}>Logout</Button>
                </li>
            </ul>
        );
    }

    return (
        <ul className={style.Menu}>
            <li className={style['Menu-Item']}>
                <NavLink
                    className={style['Menu-Link']}
                    activeClassName={style['Menu-Link_Active']}
                    to={'/registration'}
                    exact
                >
                    Registration
                </NavLink>
                <NavLink
                    className={style['Menu-Link']}
                    activeClassName={style['Menu-Link_Active']}
                    to={'/login'}
                    exact
                >
                    Login
                </NavLink>
            </li>
        </ul>
    );
};

export default Menu;
