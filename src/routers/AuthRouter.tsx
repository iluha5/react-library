import React from 'react';
import LoginContainer from "containers/Login";
import { Route, Switch } from "react-router-dom";
import RegistrationContainer from "containers/Registration";
import Page404 from "components/Page404";


class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/registration" component={RegistrationContainer}/>
                <Route path="/404" component={Page404}/>
            </Switch>
        );
    }
}

export default AppRouter;
