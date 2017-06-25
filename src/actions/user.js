import {
    USER_DATA_RECEIVED,
    USER_PROFILE_UPDATED,
    USER_CHANGE_AVATAR,
    LOAD_AVATAR_BY_URL
} from 'types';
import { browserHistory } from 'react-router';
import { usersAPI } from 'services';
import { fetching } from './fetching';


export function loadAvatarByUrl(url) {
    return dispatch => {
        dispatch(fetching(true));
        usersAPI.getAvatarByUrl(url)
            .then(res => res.blob())
            .then(blob => {
                console.log('avatar is loaded');
                dispatch(userLoadAvatar(blob));
                dispatch(fetching(false));
            })
            .catch(err => {
                console.log('Error loadAvatarByUrl:\n', err);
            });
    };
}

export function changeAvatar({ userId, file }) {
    return (dispatch, getState) => {
        const { avatarUrl: lastAvatar} = getState().user;
        dispatch(fetching(true));
        usersAPI.changeAvatar({ userId, file, lastAvatar })
            .then(res => res.text())
            .then(src => {
                console.log('Response changeAvatar method:\n', src);
                dispatch(userChangeAvatar(src));
                dispatch(loadAvatarByUrl(src));
                dispatch(fetching(false));
            })
            .catch(err => {
                console.log('Error changeAvatar:\n', err);
            });
    };
}

export function userDataReceived(payload) {
    return {
        type: USER_DATA_RECEIVED,
        payload
    };
}

export function userChangeAvatar(payload) {
    return {
        type: USER_CHANGE_AVATAR,
        payload
    };
}

export function userLoadAvatar(payload) {
    return {
        type: LOAD_AVATAR_BY_URL,
        payload
    };
}

export function updateUserProfile(user) {
    return (dispatch, getState) => {
        dispatch(fetching(true));
        usersAPI.updateUserProfile(user)
            .then(res => {
                if (res.status == 401 || res.status == 404) {
                    localStorage.clear();
                    dispatch(userDataReceived({}));
                    dispatch(fetching(false));
                    browserHistory.replace('/login');
                    return Promise.reject(res);
                } else if (res.status == 400) {
                    let oldUser = getState().user;
                    dispatch(userDataReceived(oldUser));
                    dispatch(fetching(false));
                    browserHistory.replace('/profile');
                    return Promise.reject('400 email уже занят другим пользователем');
                } else if (res.status == 409) {
                    let oldUser = getState().user;
                    dispatch(userDataReceived(oldUser));
                    dispatch(fetching(false));
                    browserHistory.replace('/profile');
                    return Promise.reject('409 неправильный текущий пароль');
                } else {
                    return res.json();
                }
            })
            .then(user => {
                console.log('Response updateUserProfile method:\n', user);
                delete user.token;
                dispatch(userDataReceived(user));
                dispatch(fetching(false));
                browserHistory.push('/profile');
            })
            .catch(console.info);
    };
}

export function postUser({ username, password }) {
    return dispatch => {
        dispatch(fetching(true));
        usersAPI.postUser({ username, password })
            .then(res => res.json())
            .then(user => {
                console.log('Response postUser method:\n', user);
                localStorage.setItem('token', user.token);
                delete user.token;
                dispatch(userDataReceived(user));
                setTimeout(() => {
                    dispatch(fetching(false));
                    browserHistory.replace('/');
                }, 350);
            })
            .catch(console.error);
    };
}

export function login({ name, password }) {
    return dispatch => {
        dispatch(fetching(true));
        usersAPI.login({ name, password })
            .then(res => {
                if (res.status == 404) {
                    setTimeout(() => {
                        dispatch(fetching(false));
                        return Promise.reject(res.statusText);
                    }, 300);
                } else {
                    return res.json();
                }
            })
            .then(user => {
                console.log('Response login method:\n', user);
                localStorage.setItem('token', user.token);
                delete user.token;
                dispatch(userDataReceived(user));
                setTimeout(() => {
                    dispatch(fetching(false));
                    browserHistory.replace('/');
                }, 300);
            })
            .catch(err => {
                console.log('Error login method:\n', err);
            });
    };
}

export function getUserByToken() {
    return dispatch => {
        dispatch(fetching(true));
        let token = localStorage.getItem('token');
        usersAPI.getUserByToken(token)
            .then(res => {
                if (res.status == 401 || res.status == 404) {
                    console.log('Response getUserByToken method:\n', res.statusText);
                    localStorage.clear();
                    dispatch(userDataReceived({}));
                    dispatch(fetching(false));
                    browserHistory.replace('/login');
                    return Promise.reject(res.statusText);
                } else {
                    return res.json();
                }
            })
            .then(user => {
                console.log('Response getUserByToken method:\n', user);
                delete user.token;
                dispatch(userDataReceived(user));
                if (user.avatarUrl) {
                    dispatch(loadAvatarByUrl(user.avatarUrl));
                }
                setTimeout(() => {
                    dispatch(fetching(false));
                }, 300)
            })
            .catch(err => {
                console.log('Error getUserByTokenMethod:\n', err);
            });
    };
}