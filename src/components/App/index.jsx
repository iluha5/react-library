import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

function App({ handlerButtonClick, triggerBox1, isBox1Checked }) {
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
                        onClick={handlerButtonClick('Primary', true)}
                    >
                        Primary
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={handlerButtonClick('Secondary', false)}
                        btnType={'secondary'}
                    >
                        Secondary
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={handlerButtonClick('Success', true)}
                        btnType={'success'}
                    >
                        Success
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={handlerButtonClick('Fake', false)}
                        btnType={'fake'}
                    >
                        Fake
                    </Button>
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={handlerButtonClick('Link', true)}
                        btnType={'link'}
                    >
                        Link
                    </Button>
                </div>
            </div>
            <h2 className={style['App-Title']}>
                Checkbox.
            </h2>
            <h3 className={style['App-SubTitle']}>
                Try it!
            </h3>
            <div className={style['App-Line']}>
                <div className={style['App-Item']}>
                    <Checkbox
                        id='box1'
                        onChange={triggerBox1}
                    />
                </div>
                <div className={style['App-Item']}>
                    <Button
                        onClick={handlerButtonClick('Checkbox', true)}
                        disabled={!isBox1Checked}
                    >
                        Click me
                    </Button>
                </div>
            </div>
        </div>
    );
}

App.propTypes = {
    handlerButtonClick: PropTypes.func.isRequired,
    triggerBox1: PropTypes.func.isRequired,
    isBox1Checked: PropTypes.bool.isRequired,
};

export default App;
