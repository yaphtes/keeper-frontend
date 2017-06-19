import React from 'react';
import { Link } from 'react-router';

import Button from 'ui/Button';
import './style.scss';

export default class ProfileEdit extends React.Component {
    constructor(props) {
        super(props);
        let { user } = this.props;


        this.state = {
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password
        };
    }

    componentDidMount() {
        let { password, confirmPassword } = this.refs;

        password.onkeyup = this.validatePassword.bind(this);
        confirmPassword.onkeyup = this.validatePassword.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let user = this.props.user;
        user._id = this.state._id;
        user.username = this.state.username
        user.email = this.state.email;
        user.password = this.state.password;


        this.props.handleUpdateProfile(user);
    }

    validatePassword() {
        let { password, confirmPassword } = this.refs;

        if (password.value != confirmPassword.value) {
            confirmPassword.style.borderBottom = password.style.borderBottom = '1px solid red';
            confirmPassword.setCustomValidity('Пароли не совпадают');
        } else {
            confirmPassword.style.borderBottom = password.style.borderBottom = '';
            confirmPassword.setCustomValidity('');
            this.setState({
                password: password.value
            });
        }
    }

    render() {
        let { username, password, email } = this.props.user;

        return (
            <div className="profileEdit">
                <div className="profileEdit__title">Редактирование данных</div>
                <form className="profileEdit__form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="username">
                        <span></span>
                        <input
                            onChange={event => this.setState({ username: event.target.value })}
                            type="text"
                            defaultValue={username}
                        />
                    </div>
                    <div className="email">
                        <span></span>
                        <input
                            onChange={event => this.setState({ email: event.target.value })}
                            type="email"
                            defaultValue={email}
                        />
                    </div>
                    <div className="password">
                        <span></span>
                        <input type="password" defaultValue={password} ref="password" />
                    </div>
                    <div className="confirm-password">
                        <span></span>
                        <input type="password" defaultValue={password} ref="confirmPassword" />
                    </div>
                    <Button type="submit">Сохранить</Button>
                </form>
                <Link className="profileEdit__cancel" to="/profile">Отмена</Link>
            </div>
        );
    }
}