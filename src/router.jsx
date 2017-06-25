import React from 'react';
// import { , Route, IndexRoute } from 'react-router';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from 'store';

// Layouts
import EntryLayout from 'layouts/EntryLayout';
import AppLayout from 'layouts/AppLayout';

// Pages && UI
import Profile from 'ui/Profile';
import ProfileEdit from 'ui/ProfileEdit';
import Login from 'ui/Login';
import Registration from 'ui/Registration';
import Home from 'ui/Home';
import Archive from 'ui/Archive';
import Trash from 'ui/Trash';
import NotFound from 'ui/NotFound';

export default (
    <Router history={browserHistory}>
        <Route path='/' component={AppLayout}>
            <IndexRoute component={Home} />
            <Route path='archive' component={Archive} />
            <Route path='trash' component={Trash} />
            <Route path='profile'>
                <IndexRoute component={Profile} />
                <Route path='edit' component={ProfileEdit} />
            </Route>
        </Route>
        <Route path='/login' component={EntryLayout}>
            <IndexRoute component={Login} />
            <Route path='registration' component={Registration} />
        </Route>
        <Route path='*' component={NotFound} />
    </Router>
);