import React from 'react';

import CardEditing from 'ui/CardEditing';
import MasonryLayout from 'layouts/MasonryLayout';
import CreateCard from 'ui/CreateCard';
import Card from 'ui/Card';
import './style.scss';


export default class Home extends React.Component {
    render() {
        let props = this.props;
        let user = props.user;
        let cardEditing = props.cardEditing;
        let filteredCards = props.filteredCards;
        let cards;
        if (filteredCards.length) {
            console.log(filteredCards);
            cards = filteredCards.filter(card => !card.isArchived && !card.isDeleted);
        } else {
            cards = user.cards.filter(card => !card.isArchived && !card.isDeleted);
        }
        let hasFavoritedCards = cards.some(card => card.isFavorited);
        let hasOtherCards = cards.some(card => !card.isFavorited);
        let createCardIsOpen = this.props.createCardIsOpen;

        function renderWithFavorited() {
            return (
                <div>
                    <CreateCard />
                    <div className="masonry-wrapper">
                        <div className="home__type">Закрепленные</div>
                        <MasonryLayout className="favoritedCards-masonry">
                            {cards.map(card => {
                                if (card.isFavorited) {
                                    return <Card key={card._id} data={card} />
                                }
                            })}
                        </MasonryLayout>
                    </div>
                    {hasOtherCards ?
                        <div className="masonry-wrapper">
                            <div className="home__type">Другие</div>
                            <MasonryLayout className="otherCards-masonry">
                                {cards.map(card => {
                                    if (!card.isFavorited) {
                                        return <Card key={card._id} data={card} />
                                    }
                                })}
                            </MasonryLayout>
                        </div>
                        :
                        null
                    }
                </div>
            );
        }

        function renderWithoutFavorited() {
            return (
                <div>
                    <CreateCard />
                    <MasonryLayout className="masonry">
                        {cards.map(card => <Card key={card._id} data={card} />)}
                    </MasonryLayout>
                </div>
            );
        }

        return (
            <div ref="home" className="home">
                {!cardEditing.isOpen ? null :
                    <CardEditing />
                }
                {hasFavoritedCards ?
                    renderWithFavorited()
                    :
                    renderWithoutFavorited()
                }
            </div>
        );
    }
}