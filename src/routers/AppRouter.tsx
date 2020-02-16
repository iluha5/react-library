import React from 'react';
import LoginContainer from "containers/Login";
import AppContainer from "containers/App";
import { Route, Switch } from "react-router-dom";


class AppRouter extends React.Component {
    render() {
        return (
            <>
                <Switch>
                    <Route path="/login" component={LoginContainer} />
                    <Route path="*" component={AppContainer} />
                </Switch>
            </>
        );
    }
}

export default AppRouter;
