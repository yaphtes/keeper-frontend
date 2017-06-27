import React from 'react';
import { browserHistory, Link } from 'react-router';

import './style.scss';
import Button from 'ui/Button';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popupIsOpen: false,
            filter: ''
        };
    }

    handlePopup() {
        this.setState({
            popupIsOpen: !this.state.popupIsOpen
        });
    }

    componentDidUpdate() {
        this.pathname = this.props.pathname;
        let className = this.getClassNameByPath(this.pathname);
        this.header.className = `header ${className}`;
    }

    componentDidMount() {
        this.header = this.refs.header;
        this.pathname = this.props.pathname;
        let className = this.getClassNameByPath(this.pathname);
        this.header.className = `header ${className}`;

        let { user } = this.props;
        if (user.avatarUrl && !user.avatarBlob) {
            this.props.loadAvatarByUrl(user.avatarUrl);
        }
    }

    getClassNameByPath(path) {
        switch (path) {
            case '/':
                return '';

            case '/archive':
                return 'with-archive';

            case '/trash':
                return 'with-trash';

            default:
                return '';
        }
    }

    renderTitleByPath(path) {
        switch (path) {
            case '/archive':
                return <Link to="/">Архив</Link>;

            case '/trash':
                return <Link to="/">Корзина</Link>;

            default:
                return <Link to="/">Keeper</Link>;
        }
    }

    renderClassListByPath(path) {
        let base = 'header__logo';
        switch (path) {
            case '/archive':
                base += ' is-archive';
                break;

            case '/trash':
                base += ' is-trash'
                break;
        }

        return base;
    }

    handleChangeFilter(event) {
        let value = event.target.value;
        this.setState({ filter: value }, () => {
            this.props.changeFilter(value);
        });
    }

    handleClearFilter(event) {
        this.setState({ filter: '' });
        this.props.clearFilter();
        this.refs.filter.focus();
    }

    render() {
        let { popupIsOpen } = this.state;
        let { pathname } = this.props;
        let { user } = this.props;
        let avatarUrl;

        if (user.avatarBlob) {
            avatarUrl = URL.createObjectURL(user.avatarBlob);
        }

        return (
            <header ref="header" className="header">
                <div className="header--left">
                    <Button onClick={this.props.handleToggleMenu} className="header__menu-btn" icon="menu" />
                    <div className={this.renderClassListByPath(pathname)}>
                        {this.renderTitleByPath(pathname)}
                    </div>
                    <div className="header__searching">
                        <i className="material-icons search">search</i>
                        <input onChange={this.handleChangeFilter.bind(this)} type="text" placeholder="Поиск" value={this.state.filter} ref="filter" />
                        <Button onClick={this.handleClearFilter.bind(this)} icon="clear" className="clear" />
                    </div>
                </div>
                <div onClick={this.handlePopup.bind(this)} className="header--right">
                    {popupIsOpen ?
                        <div className="header__account-popup">
                            <Button onClick={() => browserHistory.push('/profile')}>Профиль</Button>
                            <Button onClick={this.props.handleLogout}>Выход</Button>
                        </div>
                        :
                        null
                    }
                    {avatarUrl ?
                        <img className="header__account-img" src={avatarUrl} />
                        :
                        <img className="header__account-img" src="/img/header-account-src-filler.png" />
                    }
                </div>
            </header>
        );
    }
}