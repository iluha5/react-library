import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider} from 'react-redux';
import { store } from 'store/index';
import RootContainer from 'containers/Root';

import './global-styles.scss?raw';
import fonts from './fonts.scss'; // eslint-disable-line



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RootContainer/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
