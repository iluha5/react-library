import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

import Button from 'components/Button';

function App({buttonClick}) {
    return (
        <div className={style['App']}>
            <h2 className={style['App-Title']}>
                Buttons.
            </h2>
            <h3 className={style['App-SubTitle']}>
                Try to click them.
            </h3>
            <div className={style['App-Line']}>
                <div className={style['App-Item']}>
                    <Button
                        onClick={buttonClick}
                    >
                        Primary
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={buttonClick}
                        btnType={'secondary'}
                    >
                        Secondary
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={buttonClick}
                        btnType={'success'}
                    >
                        Success
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={buttonClick}
                        btnType={'fake'}
                    >
                        Fake
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={buttonClick}
                        btnType={'link'}
                    >
                        Link
                    </Button>
                </div>
            </div>
        </div>
    );
}

App.propTypes = {
    buttonClick: PropTypes.func.isRequired,
};

export default App;
