import * as ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';


class Portal extends React.Component {
    constructor(props) {
        super(props);

        this._el = document.createElement('div');
        this._root = document.getElementById('portal');
    }

    componentDidMount() {
        this._root.appendChild(this._el);
    }

    componentWillUnmount() {
        this._root.removeChild(this._el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this._el,
        );
    }
}

Portal.propTypes = {
    children: PropTypes.any,
};


export default Portal;
