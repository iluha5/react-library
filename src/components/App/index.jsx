import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

import Button from 'components/Button';

function App({ buttonClick }) {
    return (
        <div className={style['App']}>
            <Button
                onClick={buttonClick}
            >Show notification</Button>
        </div>
    );
}

App.propTypes = {
    buttonClick: PropTypes.func.isRequired,
};

export default App;
