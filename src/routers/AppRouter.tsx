import React from 'react';
import MainContainer from "containers/Main";
import { Redirect, Route, Switch } from "react-router-dom";
// import AuthRouter from 'routers/AuthRouter'
import Page404 from "components/Page404";


class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path={['/login', '/registration']} render={() => <Redirect to={'/'} />} />
                <Route exact path='/' component={MainContainer}/>
                <Route path="*" component={Page404}/>
            </Switch>
        );
    }
}

export default AppRouter;
