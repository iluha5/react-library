import React from 'react';
import Button from 'components/Button';
import toJson from 'enzyme-to-json';

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
            // console.log('wrapper', wrapper);

            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });

        it('Render Button with default props', () => {
            const props = {
                children: 'Button text',
                onClick: mockFunc,
            };
            const but = toJson(shallow(<Button {...props} />));

            expect(but).toMatchSnapshot();
        });

        it('Render Button with size s, type secondary, ', () => {
            const props = {
                children: 'Button text',
                onClick: mockFunc,
                size: 's',
                btnType: 'secondary',
            };
            const but = toJson(shallow(<Button {...props} />));

            expect(but).toMatchSnapshot();
        });

        it('Render Button with size s, type success, ', () => {
            const props = {
                children: 'Button text',
                onClick: mockFunc,
                size: 's',
                btnType: 'success',
            };
            const but = toJson(shallow(<Button {...props} />));

            expect(but).toMatchSnapshot();
        });

        it('Render Button with size s, type fake, disabled ', () => {
            const props = {
                children: 'Button text',
                onClick: mockFunc,
                size: 's',
                btnType: 'fake',
                disabled: true,
            };
            const but = toJson(shallow(<Button {...props} />));

            expect(but).toMatchSnapshot();
        });

        it('Render Button with size m, type link', () => {
            const props = {
                children: 'Button text',
                onClick: mockFunc,
                size: 'm',
                btnType: 'link',
            };
            const but = toJson(shallow(<Button {...props} />));

            expect(but).toMatchSnapshot();
        });

        it('Render Button with size m, type link, classname mock-class', () => {
            const props = {
                className: 'mock-class',
                children: 'Button text',
                onClick: mockFunc,
                size: 'm',
                btnType: 'link',
            };
            const but = toJson(shallow(<Button {...props} />));

            expect(but).toMatchSnapshot();
        });
    });
});
