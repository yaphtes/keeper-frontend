import {
    TOGGLE_MENU,
    MOUNT_MASONRIES,
    ADD_MASONRY,
    CLEAR_MASONRIES,
    REFRESH_MASONRIES_ARRAY,
    TOGGLE_CREATE_CARD,
    CLOSE_CREATE_CARD
} from 'types';

export default function ui(state = {}, action) {
    switch (action.type) {
        case CLOSE_CREATE_CARD:
            return {
                ...state,
                createCardIsOpen: false
            };

        case TOGGLE_MENU:
            return {
                ...state,
                menuIsOpen: !state.menuIsOpen
            };

        case TOGGLE_CREATE_CARD:
            return {
                ...state,
                createCardIsOpen: !state.createCardIsOpen
            }

        case MOUNT_MASONRIES:
            let masonries = state.masonries;
            masonries.forEach(masonry => {
                console.log('mounting masonry');
                masonry.mount();
            });
            return state;

        case REFRESH_MASONRIES_ARRAY:
            return {
                ...state,
                masonries: action.payload
            };

        case ADD_MASONRY:
            return {
                ...state,
                masonries: [...state.masonries, action.payload]
            };

        default:
            return state;
    }
}