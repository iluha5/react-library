import React from 'react';
import LoginContainer from "containers/Login";
import MainContainer from "containers/Main";
import { Route, Switch } from "react-router-dom";


class AppRouter extends React.Component {
    render() {
        return (
            <>
                <Switch>
                    <Route path="/login" component={LoginContainer} />
                    <Route path="*" component={MainContainer} />
                </Switch>
            </>
        );
    }
}

export default AppRouter;
