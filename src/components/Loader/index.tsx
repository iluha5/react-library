import * as React from 'react';
import { css } from '@emotion/core';

import { DotLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

interface IState {
    loading: boolean,
}

class Loader extends React.Component<{}, IState> {
    state = {
        loading: true,
    };

    render() {
        return (
            <div className='sweet-loading'>
                <DotLoader
                    css={override}
                    sizeUnit={'px'}
                    size={50}
                    color={'#f9843e'}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default Loader;
