import {
    USER_DATA_RECEIVED,
    CREATE_CARD,
    TOGGLE_CARD,
    TO_ARCHIVE_CARD,
    TO_HOME_CARD,
    TO_TRASH_CARD,
    DELETE_FOREVER_CARD,
    MAKE_COPY_OF_CARD,
    CHANGE_BG_COLOR,
    UPDATE_CARD,
    USER_CHANGE_AVATAR,
    LOAD_AVATAR_BY_URL,
    CLEAR_TRASH
} from 'types';

export default function user(state, action) {
    switch (action.type) {
        case CLEAR_TRASH:
            return {
                ...state,
                cards: state.cards.filter(card => !card.isDeleted)
            };

        case LOAD_AVATAR_BY_URL:
            return {
                ...state,
                avatarBlob: action.payload
            };

        case USER_CHANGE_AVATAR:
            return {
                ...state,
                avatarUrl: action.payload
            };

        case UPDATE_CARD: {
            let updatedCard = action.payload;
            let id = updatedCard._id;
            let cards = state.cards.map(card => {
                if (card._id == id) {
                    return updatedCard;
                } else {
                    return card;
                }
            });

            return {
                ...state,
                cards: [...cards]
            };
        }

        case USER_DATA_RECEIVED:
            return {
                ...state,
                ...action.payload
            };

        case CREATE_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload]
            };

        case TOGGLE_CARD: {
            let id = action.payload;
            let cards = state.cards.map(card => {
                if (card._id == id) {
                    card.isFavorited = !card.isFavorited;
                    return card;
                } else {
                    return card;
                }
            });

            return {
                ...state,
                cards: [...cards]
            };
        }

        case MAKE_COPY_OF_CARD: {
            let addingCard = action.payload;

            return {
                ...state,
                cards: [...state.cards, addingCard]
            };
        }

        case DELETE_FOREVER_CARD: {
            let id = action.payload;
            let cards = state.cards.filter(card => card._id != id);

            return {
                ...state,
                cards: [...cards]
            };
        }

        case TO_TRASH_CARD: {
            let id = action.payload;
            let cards = state.cards.map(card => {
                if (card._id == id) {
                    card.isArchived = false;
                    card.isDeleted = true;
                    return card;
                } else {
                    return card;
                }
            });


            return {
                ...state,
                cards: [...cards]
            };
        }

        case TO_ARCHIVE_CARD: {
            let id = action.payload;
            let cards = state.cards.map(card => {
                if (card._id == id) {
                    card.isArchived = true;
                    card.isDeleted = false;
                    return card;
                } else {
                    return card;
                }
            });

            return {
                ...state,
                cards: [...cards]
            };
        }

        case CHANGE_BG_COLOR: {
            let updatedCard = action.payload;
            let id = updatedCard._id;

            let cards = state.cards.map(card => {
                if (card._id == id) {
                    card.bgColor = updatedCard.bgColor;
                    return card;
                } else {
                    return card;
                }
            });

            return {
                ...state,
                cards: [...cards]
            };
        }

        case TO_HOME_CARD: {
            let id = action.payload;
            let cards = state.cards.map(card => {
                if (card._id == id) {
                    card.isArchived = false;
                    card.isDeleted = false;
                    return card;
                } else {
                    return card;
                }
            });

            return {
                ...state,
                cards: [...cards]
            };
        }

        default:
            return state;
    }
}

export function getFilteredCards(state, filter) {
    if (!filter) return [];
    let filteredCards = state.filter(card => {
        if (card.text.includes(filter) || card.title.includes(filter)) {
            return true;
        } else {
            return false;
        }
    })

    return filteredCards;
}