import React, { Component } from 'react';
import GroupJoinPage from './GroupJoinPage';
import CreateGroupPage from './CreateGroupPage';
import { BrowserRouter as Router, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom'


export default class HomePage extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'><p>Welcome Home.</p></Route>
                    <Route path='/create' component={CreateGroupPage} />
                    <Route path='/join' component={GroupJoinPage} />
                </Switch>
            </Router>
        )
    }
}
