import { testStore } from 'utils/testUtils';
import { store as realStore } from 'store';
import { updateNotification, removeNotification } from 'ac/notifications';
import { NOTIFICATION_ERROR, NOTIFICATION_PASSED } from 'utils/constants';
import AppContainer from 'containers/App';

describe('Store testing', () => {

    it('Store is updated correctly with notification', () => {
        let step = 1;
        const expectedState = {
            type: NOTIFICATION_PASSED,
            shouldRender: true,
            data: {
                title: 'Test message title',
            },
        };

        const store = testStore();
        const previousValue = store.getState().data.notification;

        const unsubscribeStore = store.subscribe(() => {
            const currentValue = store.getState().data.notification;

            if (previousValue !== currentValue){
                if (step === 2) {
                    unsubscribeStore();
                } else {
                    expect(currentValue).toStrictEqual(expectedState);
                    step++;
                }
            }
        });

        store.dispatch(updateNotification(
            NOTIFICATION_PASSED,
            {
                title: expectedState.data.title,
            }
        ));
    });

    it('Notification correctly removing from the store', () => {
        let step = 1;
        const expectedState = {
            type: NOTIFICATION_PASSED,
            shouldRender: true,
            data: {
                title: 'Test message title',
            },
        };

        const defaultState = {
            type: '',
            shouldRender: false,
            data: {},
        };

        const store = testStore();
        let previousValue = store.getState().data.notification;

        const unsubscribeStore = store.subscribe(() => {
            const currentValue = store.getState().data.notification;

            if (previousValue !== currentValue){
                previousValue = currentValue;

                if (step === 2) {
                    expect(currentValue).toStrictEqual(defaultState);
                    unsubscribeStore();
                } else {
                    step++;
                }
            }
        });

        store.dispatch(updateNotification(
            NOTIFICATION_PASSED,
            {
                title: expectedState.data.title,
            }
        ));
        store.dispatch(removeNotification());
    });

    describe('AppContainer methods integration test', () => {
        let appInstance, store;

        beforeEach(() => {
            appInstance = new AppContainer();
            store = realStore;
        });

        it('Should update store with passed notification', () => {
            const expectedState = {
                type: NOTIFICATION_PASSED,
                shouldRender: true,
                data: {
                    title: 'primary button click!',
                },
            };
            const args = [
                'primary',
                true,
            ];
            const previousValue = store.getState().data.notification;
            const unsubscribeStore = store.subscribe(() => {
                const currentValue = store.getState().data.notification;

                if (previousValue !== currentValue) {
                    expect(currentValue).toStrictEqual(expectedState);
                    unsubscribeStore();
                }
            });

            appInstance._handlerButtonClick(...args)();
        });

        it('Should update store with failed notification', () => {
            const expectedState = {
                type: NOTIFICATION_ERROR,
                shouldRender: true,
                data: {
                    title: 'fake button click!',
                },
            };
            const args = [
                'fake',
                false,
            ];
            const previousValue = store.getState().data.notification;
            const unsubscribeStore = store.subscribe(() => {
                const currentValue = store.getState().data.notification;

                if (previousValue !== currentValue) {
                    expect(currentValue).toStrictEqual(expectedState);
                    unsubscribeStore();
                }
            });

            appInstance._handlerButtonClick(...args)();
        });
    });

});
