import React from 'react';
import { browserHistory } from 'react-router';

import Button from 'ui/Button';
import './style.scss';

export default function NotFound() {
    return (
        <div className="not-found">
            <h4 className="not-found__title">404</h4>
            <p className="not-found__text">Упс, такая страница не найдена :(</p>
            <Button onClick={() => browserHistory.replace('/')} className="not-found__button">На главную</Button>
        </div>
    );
}