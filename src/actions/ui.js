import {
    TOGGLE_MENU,
    TOGGLE_CREATE_CARD,
    CLOSE_CREATE_CARD
} from './types';

export function toggleMenu() {
    return {
        type: TOGGLE_MENU
    };
}

export function toggleCreateCard() {
    return {
        type: TOGGLE_CREATE_CARD
    };
}

export function closeCreateCard() {
    return {
        type: CLOSE_CREATE_CARD
    };
}