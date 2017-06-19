import { FETCHING } from 'actions';

export default function fetching(state = false, action) {
    switch (action.type) {
        case FETCHING:
            return action.payload;

        default:
            return state;
    }
}