import React from 'react';
import { shallow } from 'enzyme';
import AppContainer from 'containers/App/index';

describe('AppContainer', () => {
    it('Should render without errors', () => {
        const wrapper = shallow(<AppContainer/>);
        expect(wrapper.length).toBe(1);
    });

    it('_triggerBox1', () => {
        const wrapper = shallow(<AppContainer/>);

        wrapper.instance()._triggerBox1();
        expect(wrapper.state('isBox1Checked')).toEqual(true);
    });

    it('_triggerBox1 twice firing', () => {
        const wrapper = shallow(<AppContainer/>);

        wrapper.instance()._triggerBox1();
        wrapper.instance()._triggerBox1();
        expect(wrapper.state('isBox1Checked')).toEqual(false);
    });

    it('_triggerCheckboxButtonClick', () => {
        const wrapper = shallow(<AppContainer/>);

        wrapper.instance()._triggerCheckboxButtonClick();
        expect(wrapper.state('isCheckboxModalOpen')).toEqual(true);
    });
});
