import React from 'react';
import { shallow } from 'enzyme';
import AppContainer from 'containers/App/index';

describe('AppContainer', () => {

    it('Should render without errors', () => {
        const component = shallow(<AppContainer/>);
        expect(component.length).toBe(1);
    });
});
