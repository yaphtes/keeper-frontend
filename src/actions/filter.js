import { CHANGE_FILTER, CLEAR_FILTER } from './types';

export function changeFilter(value) {
    return {
        type: CHANGE_FILTER,
        payload: value
    };
}

export function clearFilter() {
    return {
        type: CLEAR_FILTER
    };
}