import React from 'react';
import LoginContainer from "containers/Login";
import { Redirect, Route, Switch } from "react-router-dom";
import RegistrationContainer from "containers/Registration";

class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/registration" component={RegistrationContainer}/>
                <Route path="*" render={() => <Redirect to={'/login'}/>}/>
            </Switch>
        );
    }
}

export default AppRouter;
