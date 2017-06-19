import React from 'react';
import { Link, browserHistory } from 'react-router';

import './style.scss';
import Button from 'ui/Button';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        let input = this.refs.username;
        input.focus();
    }

    handleSubmit(event) {
        event.preventDefault();
        let payload = {
            name: this.state.username,
            password: this.state.password
        };

        this.props.handleGetUser(payload);
    }

    render() {
        return (
            <sectoin className="login">
                <div className="login__title">
                    Вход
                </div>
                <form onSubmit={this.handleSubmit.bind(this)} className="form">
                    <input
                        onChange={event => this.setState({ username: event.target.value })}
                        className="form__username"
                        type="text"
                        placeholder="Имя пользователя"
                        ref="username"
                        required />
                    <input
                        onChange={event => this.setState({ password: event.target.value })}
                        className="form__password"
                        type="password"
                        placeholder="Пароль"
                        required />
                    <Button className="form__button" type="submit">Войти</Button>
                </form>
                <div className="social-buttons is-disabled">
                    <Button className="social-buttons--vk" icon="" />
                    <Button className="social-buttons--google" icon="" />
                    <Button className="social-buttons--facebook" icon="" />
                    <Button className="social-buttons--github" icon="" />
                </div>
                <Link to="/login/registration" className="login__registration">Регистрация</Link>
            </sectoin>
        );
    }
}
