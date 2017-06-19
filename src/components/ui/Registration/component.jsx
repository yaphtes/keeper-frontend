import React from 'react';
import { Link } from 'react-router';

import './style.scss';
import Button from 'ui/Button';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            secondPassword: ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let payload = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.handlePostUser(payload);
    }

    validatePassword() {
        let { password, confirmPassword } = this.refs;

        if (password.value != confirmPassword.value) {
            confirmPassword.style.border = password.style.border = '1px solid red';
            confirmPassword.setCustomValidity('Пароли не совпадают');
        } else {
            confirmPassword.style.border = password.style.border = '';
            confirmPassword.setCustomValidity('');
        }
    }

    componentDidMount() {
        let { password, confirmPassword } = this.refs;

        password.onkeyup = this.validatePassword.bind(this);
        confirmPassword.onkeyup = this.validatePassword.bind(this);

        let input = this.refs.username;
        input.focus();
    }

    render() {
        return (
            <sectoin className="registration">
                <div className="registration__title">
                    Регистрация
                </div>
                <form className="form" onSubmit={this.handleSubmit.bind(this)}>
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
                        ref="password"
                        required />
                    <input
                        onChange={event => this.setState({ secondPassword: event.target.value })}
                        className="form__password"
                        type="password"
                        placeholder="Повторите пароль"
                        ref="confirmPassword"
                        required />
                    <Button className="form__button" type="submit">Зарегистрироваться</Button>
                </form>
                <div className="social-buttons is-disabled">
                    <Button className="social-buttons--vk">
                        <i className="fa fa-vk"></i>
                    </Button>
                    <Button className="social-buttons--google">
                        <i className="fa fa-google"></i>
                    </Button>
                    <Button className="social-buttons--facebook">
                        <i className="fa fa-facebook"></i>
                    </Button>
                    <Button className="social-buttons--github">
                        <i className="fa fa-github"></i>
                    </Button>
                </div>
                <Link to="/login" className="registration__login">Вход</Link>
            </sectoin>
        );
    }
}
