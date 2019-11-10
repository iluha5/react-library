import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from 'reducers';
import { middlewares } from 'store';

export const findByTestAtrr = (component, attr) =>  component.find(`[data-test='${attr}']`);

export const findByClassName = (component, className) => component.find(`.${className}`);

export const checkProps = (component, expectedProps) =>
    checkPropTypes(component.propTypes, expectedProps, 'props', component.name);

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
};
