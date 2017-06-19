import React from 'react';

import MasonryLayout from 'layouts/MasonryLayout';
import Card from 'ui/Card';
import './style.scss';

export default function Archive(props) {
    let filteredCards = props.filteredCards;
    let cards;
    if (filteredCards.length) {
        cards = filteredCards;
    } else {
        cards = props.cards;
    }
    let archiveIsEmpty = cards.some(card => card.isArchived);

    function renderDefault() {
        return (
            <div className="archive is-empty">
                <div className="archive__empty-field">
                    <i className="material-icons">archive</i>
                    <div className="inscription">Здесь будут храниться архивированные заметки</div>
                </div>
            </div>
        );
    }

    function renderWhenIsEmpty() {
        return (
            <div className="archive">
                <MasonryLayout className="masonry">
                    {cards.map(card => {
                        if (card.isArchived) {
                            return <Card key={card._id} data={card} />
                        }
                    })}
                </MasonryLayout>
            </div>
        );
    }

    if (archiveIsEmpty) {
        return renderWhenIsEmpty();
    } else {
        return renderDefault();
    }
}