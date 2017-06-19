import React from 'react';

import ChangeColor from 'ui/ChangeColor';
import Button from 'ui/Button';
import Textarea from 'react-textarea-autosize';
import './style.scss';

export default class CardEditing extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;

        this.state = {
            _id: this.data._id,
            userId: this.data.userId,
            text: this.data.text,
            title: this.data.title,
            bgColor: this.data.bgColor,
            isFavorited: this.data.isFavorited,
            isArchived: this.data.isArchived,
            isDeleted: this.data.isDeleted,
            changeColorIsHidden: true
        };
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

    handleSubmit(event) {
        event.preventDefault();
        let card = { ...this.state };
        delete card.changeColorIsHidden;

        this.props.updateCard(card)
            .then(() => {
                this.switchPositionContext('.home');
                this.props.closeEditingCard();
            });
    }

    switchPositionContext(context) {
        let component = document.querySelector('.card-editing');

        if (context == 'body') {
            component.remove();
            document.body.appendChild(component);
        } else {
            component.remove();
            document.querySelector(context).appendChild(component);
        }
    }

    componentDidMount() {
        let banner = document.querySelector('.card-editing__banner');
        let bodyHeight = document.body.scrollHeight;
        let bodyWidth = document.body.scrollWidth;

        banner.style.width = bodyWidth + 'px';
        banner.style.height = bodyHeight + 'px';

        this.switchPositionContext('body');
    }

    handleCloseEditingCard() {
        this.switchPositionContext('.home');
        this.props.closeEditingCard();
    }

    render() {
        let {
            bgColor,
            text,
            title,
            isFavorited,
            changeColorIsHidden
         } = this.state;

        return (
            <div className="card-editing">
                <div className="card-editing__banner" onClick={this.handleCloseEditingCard.bind(this)} />
                <div className="card-editing__component" style={{ backgroundColor: String(bgColor) }}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        {changeColorIsHidden ? null :
                            <ChangeColor
                                onMouseOver={this.handleChangeColorMouseOver.bind(this)}
                                onMouseOut={this.handleChangeColorMouseOut.bind(this)}
                                changeColor={this.changeColor.bind(this)}
                            />
                        }
                        <Button
                            className="favorite"
                            icon={`${isFavorited ? 'bookmark' : 'bookmark_border'}`}
                            onClick={() => this.setState({ isFavorited: !this.state.isFavorited })}
                        />
                        <input
                            className="title"
                            type="text"
                            value={title}
                            onChange={event => this.setState({ title: event.target.value })}
                            style={{ backgroundColor: String(bgColor) }}
                        />
                        <Textarea
                            className="text"
                            value={text}
                            onChange={event => this.setState({ text: event.target.value })}
                            style={{ backgroundColor: String(bgColor) }}
                        />
                        <Button className="submit" type="submit">Готово</Button>
                    </form>
                    <div className="card-editing__buttons-area">
                        <Button
                            icon="palette"
                            onMouseEnter={this.handlePaletteMouseEnter.bind(this)}
                            onMouseLeave={this.handlePaletteMosueLeave.bind(this)}
                        />
                        {/*<Button icon="insert_photo" />*/}
                    </div>
                </div>
            </div>
        );
    }
}