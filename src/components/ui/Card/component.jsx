import React from 'react';

import ChangeColor from 'ui/ChangeColor';
import Button from 'ui/Button';
import './style.scss';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changeColorIsHidden: true
        };
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

    handlePaletteMouseEnter() {
        clearTimeout(this.timerForRemove);
        this.setState({
            changeColorIsHidden: false
        });
    }

    handlePaletteMouseLeave(event) {
        event.persist();
        this.timerForRemove = setTimeout(() => {
            this.setState({
                changeColorIsHidden: true
            });
        }, 400);
    }

    handleChangeBgColor(color) {
        let card = { ...this.props.data };
        card.bgColor = color;

        this.props.changeBgColor(card)
            .then(() => this.forceUpdate());
    }

    handleOpenEditingCard() {
        let card = this.props.data;
        this.props.openEditingCard(card);
    }

    renderWhenIsDeleted() {
        let { bgColor, _id: id, title, text } = this.props.data;

        return (
            <div className="card" style={{ backgroundColor: String(bgColor) }}>
                <div className="card__title">
                    {title}
                </div>
                <div className="card__text">
                    {text}
                </div>
                <div className="card__menu">
                    <Button onClick={this.props.toHome.bind(null, id)} icon="redo" />
                    <Button onClick={this.props.deleteForever.bind(null, id)} icon="delete_forever" />
                </div>
            </div>
        );
    }

    renderWhenIsArchived() {
        let { bgColor, _id: id, title, text } = this.props.data;

        return (
            <div className="card" style={{ backgroundColor: String(bgColor) }}>
                {this.state.changeColorIsHidden ? null :
                    <ChangeColor
                        onMouseOver={this.handleChangeColorMouseOver.bind(this)}
                        onMouseOut={this.handleChangeColorMouseOut.bind(this)}
                        changeColor={this.handleChangeBgColor.bind(this)}
                    />
                }
                <div className="card__title">
                    {title}
                </div>
                <div className="card__text">
                    {text}
                </div>
                <div className="card__menu">
                    <Button
                        onMouseEnter={this.handlePaletteMouseEnter.bind(this)}
                        onMouseLeave={this.handlePaletteMouseLeave.bind(this)}
                        icon="palette"
                    />
                    {/*<Button icon="insert_photo" />*/}
                    <Button onClick={this.props.makeCopy.bind(null, this.props.data)} icon="content_copy" />
                    <Button onClick={this.props.toHome.bind(null, id)} icon="unarchive" />
                    <Button onClick={this.props.toTrash.bind(null, id)} icon="delete" />
                </div>
            </div>
        );
    }

    renderDefault() {
        let { isFavorited, bgColor, _id: id, title, text } = this.props.data;

        return (
            <div className="card" style={{backgroundColor: String(bgColor)}}>
                {this.state.changeColorIsHidden ? null :
                    <ChangeColor
                        onMouseOver={this.handleChangeColorMouseOver.bind(this)}
                        onMouseOut={this.handleChangeColorMouseOut.bind(this)}
                        changeColor={this.handleChangeBgColor.bind(this)}
                    />
                }
                <Button
                    className="card__add-to-favorite"
                    icon={`${isFavorited ? 'bookmark' : 'bookmark_border'}`}
                    onClick={this.props.toggle.bind(null, id)}
                />
                <div className="card__title" onClick={this.handleOpenEditingCard.bind(this)}>
                    {title}
                </div>
                <div className="card__text" onClick={this.handleOpenEditingCard.bind(this)}>
                    {text}
                </div>
                <div className="card__menu">
                    <Button
                        onMouseEnter={this.handlePaletteMouseEnter.bind(this)}
                        onMouseLeave={this.handlePaletteMouseLeave.bind(this)}
                        icon="palette"
                    />
                    {/*<Button icon="insert_photo" />*/}
                    <Button onClick={this.props.makeCopy.bind(null, this.props.data)} icon="content_copy" />
                    <Button onClick={this.props.toArchive.bind(null, id)} icon="archive" />
                    <Button onClick={this.props.toTrash.bind(null, id)} icon="delete" />
                </div>
            </div>
        );
    }

    render() {
        let { isArchived, isDeleted } = this.props.data;

        if (isArchived) {
            return this.renderWhenIsArchived();
        } else if (isDeleted) {
            return this.renderWhenIsDeleted();
        } else {
            return this.renderDefault();
        }
    }
}