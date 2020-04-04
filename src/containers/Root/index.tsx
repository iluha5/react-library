import React, { useEffect } from 'react';
import AppRouter from "../../routers/AppRouter";
import NotificationContainer from 'containers/Notification';
import cn from 'classnames';
import AuthRouter from 'routers/AuthRouter'

import style from './style.scss';
import HeaderContainer from "containers/Header";
import { rootState } from "reducers/index";
import { useDispatch, useSelector } from "react-redux";
import fb from "../../firebase/firebase";
import { loginStatusSuccess } from "ac/loginStatus";
import { signInSuccess } from "ac/auth";
import Loader from "components/Loader";

const RootContainer: React.FC = () => {
    const loginStatus = useSelector((state: rootState) => state.loginStatus);
    const dispatch = useDispatch();

    const onUserLoggedIn = (user: any) => {
        dispatch(loginStatusSuccess({
            isUserLoggedIn: true,
        }));

        dispatch(signInSuccess(user.email, user.refreshToken));
    };
    const onUserNotLoggedIn = () => {
        dispatch(loginStatusSuccess({
            isUserLoggedIn: false,
        }));
    };

    useEffect(() => {
        const unSubscribeUserStatus = fb.subscribeUserStatus(onUserLoggedIn, onUserNotLoggedIn);

        return () => {
            unSubscribeUserStatus();
        }
    }, []);

    return (
        <div className={cn(
            style['Root'],
            !loginStatus.data.isUserLoggedIn && style['Root-AuthFull'],
        )}>
            <HeaderContainer isLoggedIn={!!loginStatus.data.isUserLoggedIn}/>
            {loginStatus.isFetching ?
                <Loader/>
                :
                loginStatus.data.isUserLoggedIn ?
                    <AppRouter/>
                    :
                    <AuthRouter/>
            }
            <NotificationContainer/>
        </div>
    );
};

export default RootContainer;
