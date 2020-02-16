import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider} from 'react-redux';
import { store } from './store/index';

import fonts from './fonts.scss'; // eslint-disable-line

import './global-styles.scss?raw';

import RootContainer from 'containers/Root';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RootContainer/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
