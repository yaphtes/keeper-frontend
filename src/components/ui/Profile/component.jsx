import React from 'react';
import { browserHistory } from 'react-router';

import Button from 'ui/Button';
import './style.scss';

export default class Profile extends React.Component {
    componentDidMount() {
        this.fileInput = this.refs.fileInput;

        let user = this.props.user;

        if (user.avatarUrl && !user.avatarBlob) {
            this.props.loadAvatarByUrl(user.avatarUrl);
        }
    }

    handleChangeInput(event) {
        let user = this.props.user;
        let userId = user._id;

        let target = event.target;
        let file = target.files[0];

        this.props.changeAvatar({ userId, file });
    }

    render() {
        let user = this.props.user;
        let avatarUrl;

        if (user.avatarBlob) {
            avatarUrl = URL.createObjectURL(user.avatarBlob);
        }

        return (
            <section className="profile">
                <div className="profile__avatar" onClick={() => this.fileInput.click()}>
                    {user.avatarBlob ?
                        <img src={avatarUrl} />
                        :
                        <img src="/img/profile-src-filler.png" />
                    }
                    <input
                        type="file"
                        ref="fileInput"
                        accept='image/png, image/jpeg'
                        onChange={this.handleChangeInput.bind(this)}
                        style={{display: 'none'}}
                    />
                </div>
                <div className="profile__username">
                    {user.username}
                </div>
                {user.email ?
                    <div className="profile__email">
                        <i className="material-icons">mail</i>
                        {user.email}
                    </div>
                    :
                    null
                }
                <Button onClick={() => browserHistory.push('/profile/edit')} className="profile__edit-btn">Редактировать</Button>
            </section>
        );
    }
}