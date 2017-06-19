import React from 'react';

import Header from 'ui/Header';
import Menu from 'ui/Menu';
import Fetching from 'ui/Fetching';
import './style.scss';

class AppLayout extends React.Component {
    componentWillMount() {
        this.props.checkToken();
    }

    componentDidMount() {
        this.props.getUserByToken();
    }

    handleClick(event) {
        let target = event.target;
        if (target.closest('.create-card') ||
            target.closest('.card-editing') ||
            target.closest('.header__menu-btn') ||
            target.closest('.header--right')) {
            return;
        } else {
            this.props.closeCreateCard();
        }
    }

    render() {
        let { fetching, menuIsOpen, pathname } = this.props;

        if (fetching) {
            return <Fetching/>
        } else {
            return (
                <main onClick={this.handleClick.bind(this)}>
                    <Header pathname={pathname} />
                    <Menu className={`${menuIsOpen ? 'is-open' : ''}`} />
                    <div className={`content ${menuIsOpen ? 'menu-is-open' : ''}`}>
                        {this.props.children}
                    </div>
                </main>
            );
        }
    }
}

export default AppLayout;
