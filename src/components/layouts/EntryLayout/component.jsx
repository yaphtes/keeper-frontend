import React from 'react';
import { browserHistory } from 'react-router';

import Fetching from 'ui/Fetching';
import './style.scss';


class EntryLayout extends React.Component {
    constructor(props) {
        super(props);

        this.dispatch = this.props.dispatch;
    }

    componentWillMount() {
        if (localStorage.getItem('token')) {
            browserHistory.replace('/');
        }
    }

    render() {
        let { fetching, children } = this.props;

        if (!fetching) {
            return (
                <section className="entry-layout">
                    <h1 className="entry-layout__title">Keeper</h1>
                    <h2 className="entry-layout__subtitle">Хранение всех планов в одном месте</h2>
                    {children}
                </section>
            );
        } else {
            return <Fetching />;
        }
    }
}

export default EntryLayout;