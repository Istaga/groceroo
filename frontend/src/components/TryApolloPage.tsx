import React, { Component } from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

export class TryApolloPage extends Component {
    

    render() {
        return (
            <div>
                <p>Yeah I A.P.O.L.L.O</p>
            </div>
        )
    }
}

export default TryApolloPage
