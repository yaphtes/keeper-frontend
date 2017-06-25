import user, * as fromUser from './user';
import fetching from './fetching';
import ui from './ui';
import editingCard from './editingCard';
import filter from './filter';

export default function reducer(state = {}, action) {
    return {
        user: user(state.user, action),
        fetching: fetching(state.fetching, action),
        ui: ui(state.ui, action),
        editingCard: editingCard(state.editingCard, action),
        filter: filter(state.filter, action)
    };
}

export function getFilteredCards(state) {
    return fromUser.getFilteredCards(state.user.cards, state.filter);
}