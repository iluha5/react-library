import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
        <div>Hi world!</div>
        <Switch>
            <Route path="*" render={() => (
                <div>Hi router!</div>
            )}/>
            {/*<Route path="*" component={AppContainer} />*/}
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
