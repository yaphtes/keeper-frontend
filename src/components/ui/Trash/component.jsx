import React from 'react';

import MasonryLayout from 'layouts/MasonryLayout';
import Card from 'ui/Card';
import './style.scss';

export default function Trash(props) {
    let cards;
    let filteredCards = props.filteredCards;

    if (filteredCards.length) {
        cards = filteredCards;
    } else {
        cards = props.cards;
    }

    let trashIsEmpty = Boolean(!cards.filter(card => card.isDeleted).length);

    function renderWhenIsEmpty() {
        return (
            <div className="trash is-empty">
                <div className="trash__title">Заметки удаляются из корзины через семь дней.</div>
                <div className="trash__empty-field">
                    <i className="material-icons">delete</i>
                    <div>В корзине ничего нет</div>
                </div>
            </div>
        );
    }

    function renderDefault() {
        return (
            <div className="trash">
                <div className="trash__title">Заметки удаляются из корзины через семь дней.</div>
                <MasonryLayout className="masonry">
                    {cards.map(card => {
                        if (card.isDeleted) {
                            return <Card key={card._id} data={card} />
                        }
                    })}
                </MasonryLayout>
            </div>
        );
    }

    if (trashIsEmpty) {
        return renderWhenIsEmpty();
    } else {
        return renderDefault();
    }
}