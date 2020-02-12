import React from 'react';

import style from './style.scss';

interface IProps {
}

class Login extends React.Component<IProps> {

    render() {
        return (
            <div className={style['Login']}>


                {/*<Input*/}
                    {/*error={isEmailErrors}*/}
                    {/*className={style['Login-EmailInput']}*/}
                    {/*type='email'*/}
                    {/*name='email'*/}
                    {/*placeholder='Type an email'*/}
                    {/*onChange={onEmailChange}*/}
                    {/*endIcon={isEmailErrors &&*/}
                    {/*<Icon*/}
                        {/*name={'warning'}*/}
                        {/*size={'sm'}*/}
                    {/*/>*/}
                    {/*}*/}
                    {/*renderModalHint={isEmailErrors}*/}
                    {/*modalHintData={{*/}
                        {/*header: 'Enter an email',*/}
                        {/*content: 'Please, enter a valid email',*/}
                    {/*}}*/}
                {/*/>*/}
                {/*<Input*/}
                    {/*inputRef={(inputRef) => this._passwordRef = inputRef}*/}
                    {/*className={style['Login-Input']}*/}
                    {/*name="password"*/}
                    {/*type={isPasswordVisible ? 'text' : 'password'}*/}
                    {/*placeholder={'********'}*/}
                    {/*error={isPasswordErrors}*/}
                    {/*onChange={this._handlePasswordChange}*/}

                    {/*endIcon={isPasswordVisible ?*/}
                        {/*<Icon*/}
                            {/*className={style['Login-Input_ViewIcon']}*/}
                            {/*name={'view-accent'}*/}
                            {/*size={'s'}*/}
                            {/*onClick={this._handleViewClick('isPasswordVisible')}/>*/}
                        {/*:*/}
                        {/*<Icon*/}
                            {/*className={style['Login-Input_ViewIcon']}*/}
                            {/*name={'view'}*/}
                            {/*size={'s'}*/}
                            {/*onClick={this._handleViewClick('isPasswordVisible')}/>*/}
                    {/*}*/}

                    {/*renderModalHint={isPasswordErrors}*/}
                    {/*modalHintData={{*/}
                        {/*header: content.passwordHint.header,*/}
                    {/*}}*/}
                {/*/>*/}
            </div>
        );
    };
}


export default Login;
