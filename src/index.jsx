import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './store/index';
import AppContainer from 'containers/App';

import './global-styles.scss?raw';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="*" component={AppContainer} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
