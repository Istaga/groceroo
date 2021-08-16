import React, { Component } from 'react';
import { render } from 'react-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import { Box, Container } from '@material-ui/core';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    createHttpLink,
    fromPromise
} from "@apollo/client";

const link = createHttpLink({
    uri: '/api/gql',
    credentials: 'same-origin'
});
  
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});


export default class App extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Container>
                <Navbar />
                <HomePage />
            </Container>
        )
    }
}

const appDiv = document.getElementById("app");
render( <ApolloProvider client={client}><App /></ApolloProvider>, appDiv);