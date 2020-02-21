import React from 'react';

import { Hint } from 'components/Hint';
import {shallow, mount} from 'enzyme';
// import {checkProps, findByClassName} from 'utils/testUtils';

describe('Hint component', () => {

    it('Render Button with props 1', () => {
        const props = {
            header: 'Test Hint',
            content: 'Test Content',
        };
        const hint = shallow(<Hint {...props} />);

        expect(hint).toMatchSnapshot();
    });

    it('Render Hint content block', () => {
        const props = {
            header: 'Test Hint',
            content: 'Test Content',
        };
        const wrap = mount(<Hint {...props} />);

        expect(wrap.find('.Hint-Content').text()).toBe('Test Content');
    });
});
