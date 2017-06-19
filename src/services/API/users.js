import API from './API';

class UsersAPI extends API {
    getAvatarByUrl(url) {
        let request = new Request(`/api/avatar?url=${url}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': this.types.url,
                token: localStorage.getItem('token')
            })
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }

    changeAvatar({ userId, file, lastAvatar }) {
        let formData = new FormData();
        formData.append('avatar', file);
        formData.append('userId', userId);
        formData.append('lastAvatar', lastAvatar);

        let request = new Request('/api/user-avatar', {
            method: 'PUT',
            headers: new Headers({ token: localStorage.getItem('token') }),
            body: formData
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        })
    }

    postUser({ username, password }) {
        let request = new Request('/api/user', {
            method: 'post',
            headers: new Headers({ 'Content-Type': this.types.json }),
            body: JSON.stringify({ username, password })
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }

    login({ name, password }) {
        let type = name.includes('@') ? 'email' : 'username';
        let headers = new Headers({ 'Content-Type': this.types.url });

        switch (type) {
            case 'username':
                var request = new Request(`/api/user?username=${name}&password=${password}&type=${type}`, {
                    method: 'get',
                    headers
                });
                break;

            case 'email':
                var request = new Request(`/api/user?email=${name}&password=${password}&type=${type}`, {
                    method: 'get',
                    headers
                });
                break;

            default:
                return Promise.reject('Invalid login`s type');
        }

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    getUserByToken(token) {
        let request = new Request('/api/user-by-token', {
            method: 'get',
            headers: new Headers({ 'Content-Type': this.types.url, token })
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }

    updateUserProfile(user) {
        let request = new Request('/api/user-profile', {
            method: 'put',
            headers: new Headers({ 'Content-Type': this.types.json, token: localStorage.getItem('token') }),
            body: JSON.stringify(user)
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(res => {
                    console.log(res)
                    resolve(res);
                })
                .catch(reject);
        });
    }

}

export const usersAPI = new UsersAPI();