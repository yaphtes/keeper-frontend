import user, * as fromUser from './user';
import fetching from './fetching';
import ui from './ui';
import editingCard from './editingCard';
import filter from './filter';
import { routerReducer } from 'react-router-redux';

export default function reducer(state = {}, action) {
    return {
        user: user(state.user, action),
        fetching: fetching(state.fetching, action),
        ui: ui(state.ui, action),
        editingCard: editingCard(state.editingCard, action),
        routing: routerReducer(state.routing, action),
        filter: filter(state.filter, action)
    };
}

export function getFilteredCards(state) {
    return fromUser.getFilteredCards(state.user.cards, state.filter);
}