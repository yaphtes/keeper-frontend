import {
    CHANGE_FILTER,
    CLEAR_FILTER
} from 'types';

export default function filter(state, action) {
    switch (action.type) {
        case CHANGE_FILTER:
            return action.payload;

        case CLEAR_FILTER:
            return '';

        default:
            return state;
    }
}