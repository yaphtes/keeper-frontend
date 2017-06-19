import React from 'react';
import { browserHistory } from 'react-router';

import Button from 'ui/Button';
import './style.scss';

export default class Menu extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            let bodyHeight = document.body.scrollHeight;
            let menu = document.querySelector('.menu');
            menu.style.height = bodyHeight - 75 + 'px';
        }, 1000);
    }

    render() {
        return (
            <menu className={`menu ${this.props.className}`}>
                <div className="menu__main-area">
                    <Button onClick={() => browserHistory.push('/')} className="notes" icon="event_note">Заметки</Button>
                </div>
                <hr />
                <div className="menu__archive-area">
                    <Button onClick={() => browserHistory.push('/archive')} className="archive" icon="archive">Архив</Button>
                    <Button onClick={() => browserHistory.push('/trash')} className="trash" icon="delete">Корзина</Button>
                </div>
                <hr />
                <div className="menu__settings-area">
                    <Button disabled className="settings" icon="settings">Наcтройки</Button>
                    <Button disabled className="shortcuts" icon="keyboard">Быстрые клавиши</Button>
                    <Button disabled className="help" icon="help">Справка</Button>
                </div>
            </menu>
        );
    }
}