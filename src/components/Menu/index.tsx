import React from 'react';

import {NavLink} from 'react-router-dom';

import style from './style.scss';

const Menu: React.FC = () => {
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
                {/*{*/}
                    {/*!isUserHasCompany &&*/}
                        {/*<NavLink*/}
                            {/*className={style['Menu-Link']}*/}
                            {/*activeClassName={style['Menu-Link_Active']}*/}
                            {/*to={'/shop'}*/}
                            {/*exact*/}
                        {/*>*/}
                            {/*{content.shop}*/}
                        {/*</NavLink>*/}
                {/*}*/}
            </li>
        </ul>
    );
};

export default Menu;
