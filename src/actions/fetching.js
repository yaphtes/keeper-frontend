import { FETCHING } from 'types';

export function fetching(payload) {
    return {
        type: FETCHING,
        payload
    };
}