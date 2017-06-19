import React from 'react';
import Minigrid from 'minigrid';

import './style.scss';

export default class MasonryLayout extends React.Component {
    makeGrid() {
        this.grid = new Minigrid({
            container: String('.' + this.props.className),
            item: '.card',
            gutter: 15
        });
        window.onresize = () => {
            this.grid.mount();
        };
        setTimeout(() => {
            this.grid.mount();
        }, 4);
    }

    componentDidMount() {
        this.makeGrid();
    }

    componentDidUpdate() {
        this.makeGrid();
    }

    render() {
        return (
            <section className={this.props.className}>
                {this.props.children}
            </section>
        );
    }
}