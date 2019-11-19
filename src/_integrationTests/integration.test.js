import { testStore } from 'utils/testUtils';
import { updateNotification } from 'ac/notifications';
import { NOTIFICATION_PASSED } from 'utils/constants';

describe('Store testing', () => {

    it('Store is updated correctly', () => {
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
                expect(currentValue).toStrictEqual(expectedState);
                unsubscribeStore();
            }
        });

        store.dispatch(updateNotification(
            NOTIFICATION_PASSED,
            {
                title: expectedState.data.title,
            }
        ));
    });


});
