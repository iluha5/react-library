//@ts-nocheck

import * as React from 'react';

import cn from 'classnames';

import style from './style.scss';

import Paper from 'components/Paper';

interface IProps {
    image?: string,
    children: React.ReactNode
}

const AuthPattern: React.FC<IProps> = ({ children, image }) => {
    return (
        <div className={style['AuthPattern']}>
            <div className={cn(
                style['AuthPattern-Modal'],
                image && style['AuthPattern-Modal_WithImage']
            )}>
                <Paper
                    className={style['AuthPattern-Main']}
                    background={'rgba(255,255,255,0)'}
                >
                    <div className={style['AuthPattern-PaperContainer']}>
                        <div className={style['AuthPattern-Pattern']}> </div>
                        <div className={style['AuthPattern-ContentContainer']}>
                            <div className={style['AuthPattern-Content']}>
                                <div className={style['AuthPattern-ImageWrapper']}>
                                    {image ?
                                        <img className={style['AuthPattern-Logo']} src={image} alt=""/>
                                        :
                                        null
                                    }
                                    {/*<img className={style['AuthPattern-Logo']} src={logo} alt=""/>*/}
                                </div>

                                {children}
                            </div>
                        </div>

                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default AuthPattern;
