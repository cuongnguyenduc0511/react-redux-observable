import { requestActions } from '../actions/Request/types'

const INITIAL_STATE = {
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case requestActions.RECEIVED_REQUESTS:
            console.log('Reducer');
            return {
                ...state,
                result: action.payload
            };
        case requestActions.RESET_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}

