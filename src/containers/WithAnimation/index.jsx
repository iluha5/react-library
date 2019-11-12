import React from 'react';
import PropTypes from 'prop-types';

import animation from '../../animation.scss';
import cn from 'classnames';


function withAnimation(WrappedComponent) {

    class WithAnimation extends React.Component {
        state = {
            isWillUnmount: false,
        };

        componentDidUpdate(prevProps) {
            if (!this.props.mount && prevProps.mount && !this.props.withoutAnimation) {
                this.setState(
                    {
                        isWillUnmount: true,
                    },
                    () => setTimeout(() => this.setState(
                        {
                            isWillUnmount: false,
                        }
                    ), 200)
                );
            }
        }


        render() {
            const { isWillUnmount } = this.state;
            const { mount, withoutAnimation, animationIn, animationOut, ...restProps } = this.props;

            if (!mount && !isWillUnmount) return null;

            return (
                <div
                    className={cn(
                        !withoutAnimation && animation['animated'],
                        isWillUnmount ?
                            animation[animationOut]
                            :
                            animation[animationIn]
                    )}
                >
                    <WrappedComponent {...restProps} />
                </div>
            );
        }
    }

    WithAnimation.defaultProps = {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
    };

    WithAnimation.propTypes = {
        mount: PropTypes.bool.isRequired,
        withoutAnimation: PropTypes.bool,
        animationIn: PropTypes.string.isRequired,
        animationOut: PropTypes.string.isRequired,
    };

    return WithAnimation;
}


export default withAnimation;
