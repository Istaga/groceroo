import React, { Component } from 'react';
import { render } from 'react-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import { Container, makeStyles } from '@material-ui/core';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";

const link = createHttpLink({
    uri: '/api/gql',
    credentials: 'same-origin'
});
  
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

const useStyles = makeStyles(() => ({
    page: {
        backgroundColor: '#dfe6e9',
        padding: 0,
        flex: 1,
        minHeight: '100vh',
    },
    main: {
        marginTop: '2%',
        maxWidth: '95%',
        flex: 1,
    }
}));

const App = () => {
    const classes = useStyles();

    return (
        <Container className={classes.page}>
            <Navbar />
            <Container className={classes.main}>
                <HomePage />
            </Container>
        </Container>
    );
}


export default App;

const appDiv = document.getElementById("app");
render( <ApolloProvider client={client}><App /></ApolloProvider>, appDiv);