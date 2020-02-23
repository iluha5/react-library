import React from 'react';
import { PacmanLoader } from 'react-spinners';

class Loader extends React.Component {
    state = {
        loading: true,
    };

    render() {
        const { loading } = this.state;

        return (
            <div className='sweet-loading'>
                <PacmanLoader
                    sizeUnit={'px'}
                    size={50}
                    color={'#33B0B3'}
                    loading={loading}
                />
            </div>
        );
    }
}

export default Loader;
