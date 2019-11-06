import {
    UPDATE_NOTIFICATION,
    REMOVE_NOTIFICATION,
} from 'ac/constants';


const notification = (state, action) => {
    state = state !== undefined ?
        state :
        {
            type: '',
            shouldRender: false,
            data: {},
        };

    switch (action.type) {
        case UPDATE_NOTIFICATION:
            return {
                ...state,
                type: action.payload.type,
                shouldRender: true,
                data: action.payload.data,
            };
        case REMOVE_NOTIFICATION:
            return {
                type: '',
                shouldRender: false,
                data: {},
            };
        default:
            return state;
    }
};

export default notification;
