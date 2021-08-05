import React, { Component } from 'react';
import RoomJoinPage from './GroupJoinPage';
import CreateGroupPage from './CreateGroupPage';
import TryApolloPage from './TryApolloPage.js';

import { BrowserRouter as Router, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom'


export default class HomePage extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'>Ass</Route>
                    <Route path='/create' component={CreateGroupPage} />
                    <Route path='/join' component={RoomJoinPage} />
                    <Route path='/try'><TryApolloPage name="Ass" /></Route>
                </Switch>
            </Router>
        )
    }
}
