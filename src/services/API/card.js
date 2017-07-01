import API from './API';

class CardAPI extends API {
    clearTrash() {
        let request = new Request('/api/clear-trash', {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': this.types.json,
                token: localStorage.getItem('token')
            })
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }

    update(card) {
        let headers = new Headers({
            'Content-Type': this.types.json,
            token: localStorage.getItem('token')
        });

        let request = new Request('/api/card', {
            method: 'PUT',
            body: JSON.stringify(card),
            headers
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }

    create(card) {
        let headers = new Headers({
            'Content-Type': this.types.json,
            token: localStorage.getItem('token')
        });

        let request = new Request('/api/card', {
            method: 'post',
            body: JSON.stringify(card),
            headers
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }

    toggle(id) {
        let request = new Request('/api/toggle', {
            method: 'PATCH',
            body: JSON.stringify({ id }),
            headers: new Headers({
                'Content-Type': this.types.json,
                token: localStorage.getItem('token')
            })
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }

    toTrash(id) {
        let request = new Request('/api/to-trash', {
            method: 'PATCH',
            body: JSON.stringify({ id }),
            headers: new Headers({
                'Content-Type': this.types.json,
                token: localStorage.getItem('token')
            })
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .then(reject);
        })
    }

    toArchive(id) {
        let request = new Request('/api/to-archive', {
            method: 'PATCH',
            body: JSON.stringify({ id }),
            headers: new Headers({
                'Content-Type': this.types.json,
                token: localStorage.getItem('token')
            })
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }

    toHome(id) {
        let request = new Request('/api/to-home', {
            method: 'PUT',
            body: JSON.stringify({ id }),
            headers: new Headers({
                'Content-Type': this.types.json,
                token: localStorage.getItem('token')
            })
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }

    deleteForever(id) {
        let request = new Request('/api/delete-forever', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: new Headers({
                'Content-Type': this.types.json,
                token: localStorage.getItem('token')
            })
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }

    makeCopy(data) {
        let request = new Request('/api/make-copy', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': this.types.json,
                token: localStorage.getItem('token')
            })
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }

    changeBgColor(card) {
        let request = new Request('/api/change-bg-color', {
            method: 'PATCH',
            body: JSON.stringify(card),
            headers: new Headers({
                'Content-Type': this.types.json,
                token: localStorage.getItem('token')
            })
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(resolve)
                .catch(reject);
        });
    }
}

export const cardAPI = new CardAPI();