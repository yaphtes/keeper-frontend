export {
    postUser,
    login,
    getUserByToken,
    userDataReceived,
    updateUserProfile,
    changeAvatar,
    loadAvatarByUrl
} from './user';

export { fetching } from './fetching';

export {
    toggleMenu,
    toggleCreateCard,
    closeCreateCard
} from './ui';

export {
    createCard,
    toggleCard,
    toArchiveCard,
    toHomeCard,
    toTrashCard,
    deleteForeverCard,
    makeCopyOfCard,
    changeBgColor,
    openEditingCard,
    closeEditingCard,
    updateCard,
    clearTrash
} from './cards';

export {
    changeFilter,
    clearFilter
} from './filter';

export * from './types';