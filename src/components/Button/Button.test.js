import React from 'react';
import Button from 'components/Button';

import { shallow } from 'enzyme';
import { checkProps } from 'utils/testUtils';

describe('Button component', () => {
    it('Should render without errors', () => {
        const component = shallow(<Button />);
        expect(component.length).toBe(1);
    });

    it('Should not throw a warning', () => {
        const expectedProps = {
            className: 'TestingClass',
            btnType: 'secondary',
            size: 'm',
            disabled: false,
            children: 'Test button',
            onClick: () => {},
        };
        const propsError = checkProps(Button, expectedProps);
        expect(propsError).toBeUndefined();
    });
});
