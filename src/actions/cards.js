import {
    CREATE_CARD,
    TOGGLE_CARD,
    TO_ARCHIVE_CARD,
    TO_HOME_CARD,
    TO_TRASH_CARD,
    DELETE_FOREVER_CARD,
    MAKE_COPY_OF_CARD,
    CHANGE_BG_COLOR,
    OPEN_EDITING_CARD,
    CLOSE_EDITING_CARD,
    UPDATE_CARD
} from './types';
import { cardAPI } from 'services';
import { mountMasonries } from './ui';

export function updateCard(card) {
    return cardAPI.update(card)
        .then(response => {
            if (response.status == 200) {
                return response.text();
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(text => {
            console.log('response updateCard method:\n', text);
            return {
                type: UPDATE_CARD,
                payload: card
            };
        })
        .catch(err => {
            console.error('updateCard error method:\n', err);
        });
}

export function closeEditingCard() {
    return { type: CLOSE_EDITING_CARD };
}

export function openEditingCard(card) {
    return {
        type: OPEN_EDITING_CARD,
        payload: card
    };
}

export function changeBgColor(card) {
    return cardAPI.changeBgColor(card)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(card => {
            console.log('response changeBgColor method:\n', card);
            return {
                type: CHANGE_BG_COLOR,
                payload: card
            };
        })
        .catch(err => {
            console.error('changeBgCoolor error method:\n', err);
        });
}

export function makeCopyOfCard(data) {
    let dataForMakeCard = { ...data };
    delete dataForMakeCard._id;
    return cardAPI.makeCopy(dataForMakeCard)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(copiedCard => {
            console.log('response makeCopyOfCard method:\n', copiedCard);
            return {
                type: MAKE_COPY_OF_CARD,
                payload: copiedCard
            };
        })
        .catch(err => {
            console.error('makeCopyOfCard error method:\n', err);
        });
}

export function deleteForeverCard(id) {
    return cardAPI.deleteForever(id)
        .then(response => {
            if (response.status == 200) {
                return response.text();
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(text => {
            console.log('response deleteForeverCard method:\n', text);
            return {
                type: DELETE_FOREVER_CARD,
                payload: id
            };
        })
        .catch(err => {
            console.error('deleteForeverCard error method:\n', err);
        });
}

export function toHomeCard(id) {
    return cardAPI.toHome(id)
        .then(response => {
            if (response.status == 200) {
                return response.text();
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(text => {
            console.log('response toHomeCard method:\n', text);
            return {
                type: TO_HOME_CARD,
                payload: id
            };
        })
        .catch(err => {
            console.error('toHomeCard error method:\n', err);
        });
}

export function toTrashCard(id) {
    return cardAPI.toTrash(id)
        .then(response => {
            if (response.status == 200) {
                return response.text()
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(text => {
            console.log('response toTrasCard method:\n', text);
            return {
                type: TO_TRASH_CARD,
                payload: id
            };
        })
        .catch(err => {
            console.error('toTrashCard error method:\n', err);
        });
}

export function toArchiveCard(id) {
    return cardAPI.toArchive(id)
        .then(response => {
            if (response.status == 200) {
                return response.text();
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(text => {
            console.log('response toArchiveCard method:\n', text);
            return {
                type: TO_ARCHIVE_CARD,
                payload: id
            };
        })
        .catch(err => {
            console.error('toArchiveCard error method:\n', err);
        });
}

export function createCard(card) {
    return cardAPI.create(card)
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    return Promise.reject(response.status);
                }
            })
            .then(createdCard => {
                console.log('response createCard method:\n', createdCard);
                return {
                    type: CREATE_CARD,
                    payload: createdCard
                };
            })
            .catch(err => {
                console.error('createCard error method:\n', err);
            });
}

export function toggleCard(id) {
    return cardAPI.toggle(id)
        .then(response => {
            if (response.status == 200) {
                return response.text();
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(text => {
            console.log('response toggleCard method:\n', text);
            return {
                type: TOGGLE_CARD,
                payload: id
            };
        })
        .catch(err => {
            console.error('toggleCard error method:\n', err);
        });
}