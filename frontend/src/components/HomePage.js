import React, { Component } from 'react';
import GroupJoinPage from './GroupJoinPage';
import CreateGroupPage from './CreateGroupPage';
import GroceriesPage from './GroceriesPage.js';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


export default class HomePage extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'><Redirect to="join" /></Route>
                    <Route path='/create' component={CreateGroupPage}></Route>
                    <Route path='/join' component={GroupJoinPage} />
                    <Route path='/rooms/' component={GroceriesPage}></Route>
                </Switch>
            </Router>
        )
    }
}
