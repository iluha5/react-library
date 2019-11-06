import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

function App({ showNotification }) {
    return (
        <>
            <div>Hi world!</div>
            <Button
                onClick={showNotification}
            >Show notification</Button>
        </>
    );
}

App.propTypes = {
    showNotification: PropTypes.func.isRequired,
};

export default App;
