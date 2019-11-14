import React from 'react';
import Button from 'components/Button';

import {shallow} from 'enzyme';
import {checkProps, findByClassName} from 'utils/testUtils';

describe('Button component', () => {
    it('Should render without errors', () => {
        const component = shallow(<Button/>);
        expect(component.length).toBe(1);
    });

    it('Should not throw a warning', () => {
        const props = {
            className: 'TestingClass',
            btnType: 'secondary',
            size: 'm',
            disabled: false,
            children: 'Test button',
            onClick: () => {},
        };
        const propsError = checkProps(Button, props);
        expect(propsError).toBeUndefined();
    });

    describe('Renders', () => {
        let wrapper;
        let mockFunc;

        beforeEach(() => {
            mockFunc = jest.fn();
            const props = {
                children: 'Button text',
                onClick: mockFunc,
            };
            wrapper = shallow(<Button {...props} />);
        });

        it('Should emit callback on click event', () => {
            const button = findByClassName(wrapper, 'Btn');
            button.simulate('click');

            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });
    });
});
