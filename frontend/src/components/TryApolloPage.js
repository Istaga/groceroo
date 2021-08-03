import React, { Component } from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    createHttpLink
} from "@apollo/client";

const link = createHttpLink({
    uri: 'api/gql',
    credentials: 'same-origin'
});
  
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

const pleaseworkquery = gql`
        query showGroceryLists {
            allGroceries{
            id
            title
            code
            }
        }
    `

function GroceryTings() {
    const { loading, error, data } = useQuery(pleaseworkquery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data === undefined | data == null ) return <p>Oh no!</p>;
    return data.allGroceries.map(({ id, title, code }) => (
      <div key={ id }>
        <p>
          {title}: {code}
        </p>
      </div>
    ));
  }

export class TryApolloPage extends Component {



    render() {
        return (
            <ApolloProvider client={client}>
                <GroceryTings /> 
            </ApolloProvider>
        )
    }
}

export default TryApolloPage
