import React from 'react';

import ChangeColor from 'ui/ChangeColor';
import Button from 'ui/Button';
import Textarea from 'react-textarea-autosize';
import './style.scss';

export default class CreateCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            changeColorIsHidden: true,
            title: '',
            text: '',
            bgColor: 'rgb(255, 255, 255)',
            isFavorited: false,
            isArchived: false,
            isDeleted: false
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        let card = { ...this.state };
        delete card.changeColorIsHidden;
        if (!card.text) return;
        this.setState(this.getInitialState());
        card.userId = this.props.userId;

        this.props.createCard(card);
    }

    handlePaletteMouseEnter() {
        clearTimeout(this.timerForRemove);
        this.setState({
            changeColorIsHidden: false
        });
    }

    handlePaletteMosueLeave() {
        this.timerForRemove = setTimeout(() => {
            this.setState({
                changeColorIsHidden: true
            });
        }, 400);
    }

    handleChangeColorMouseOver() {
        clearTimeout(this.timerForRemove);
    }

    handleChangeColorMouseOut() {
        this.timerForRemove = setTimeout(() => {
            this.setState({
                changeColorIsHidden: true
            });
        }, 100);
    }

    changeColor(color) {
        this.setState({
            bgColor: color
        });
    }

    renderWhenIsOpen() {
        let { isFavorited, changeColorIsHidden, bgColor, title, text } = this.state;

        return (
            <div ref="container" className="create-card is-open" style={{ backgroundColor: String(bgColor) }}>
                {changeColorIsHidden ? null :
                    <ChangeColor
                        onMouseOver={this.handleChangeColorMouseOver.bind(this)}
                        onMouseOut={this.handleChangeColorMouseOut.bind(this)}
                        changeColor={this.changeColor.bind(this)}
                    />
                }
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Button
                        className="favorite"
                        icon={`${isFavorited ? 'bookmark' : 'bookmark_border'}`}
                        onClick={() => this.setState({ isFavorited: !this.state.isFavorited })}
                    />
                    <input
                        className="title"
                        type="text"
                        placeholder="Введите заголовок"
                        onChange={event => this.setState({ title: event.target.value })}
                        style={{ backgroundColor: String(bgColor) }}
                        value={title}
                    />
                    <Textarea
                        autoFocus
                        className="text"
                        placeholder="Заметка..."
                        onChange={event => this.setState({ text: event.target.value })}
                        style={{ backgroundColor: String(bgColor) }}
                        value={text}
                    />
                    <Button className="submit" type="submit">Готово</Button>
                </form>
                <div className="create-card__buttons-area">
                    <Button
                        icon="palette"
                        onMouseEnter={this.handlePaletteMouseEnter.bind(this)}
                        onMouseLeave={this.handlePaletteMosueLeave.bind(this)}
                    />
                    {/*<Button icon="insert_photo" />*/}
                </div>
            </div>
        );
    }

    renderWhenIsNotOpen() {
        return (
            <div className="create-card" onClick={this.props.toggle}>
                <span>Создать заметку...</span>
                <Button className="insert-photo" icon="keyboard_arrow_down" />
            </div>
        );
    }

    render() {
        let isOpen = this.props.isOpen;

        if (isOpen) {
            return this.renderWhenIsOpen();
        } else {
            return this.renderWhenIsNotOpen();
        }
    }
}