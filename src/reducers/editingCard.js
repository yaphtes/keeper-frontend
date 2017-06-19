import {
    OPEN_EDITING_CARD,
    CLOSE_EDITING_CARD
} from 'types';

export default function editingCard(state, action) {
    switch (action.type) {
        case CLOSE_EDITING_CARD:
            return {
                isOpen: false,
                data: {}
            };

        case OPEN_EDITING_CARD:
            return {
                data: action.payload,
                isOpen: true
            };

        default:
            return state;
    }
}