import React, { Component } from 'react'
import {
    useQuery,
} from "@apollo/client";

import { ALL_ROOMS_QUERY, GET_ROOM_QUERY } from '../gql/Queries';

// const pleaseworkquery = gql`
//         query showGroceryLists {
//             allGroceries{
//             id
//             title
//             code
//             }
//         }
//     `

function GroceryTings() {
    const { loading, error, data } = useQuery(ALL_ROOMS_QUERY);
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

function SpecificTings(props) {
    const { loading, error, data } = useQuery(GET_ROOM_QUERY, 
        {
            variables: { code: props.room_code }
        });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data === undefined | data == null ) return <p>Oh no!</p>;
    return (
        <div>
            Code is: { data.pacificRoom.code }
            ===
            title is : { data.pacificRoom.title }
        </div>
    )
}

function TryApolloPage(props) {
    return (
        <div>
            <GroceryTings />
            <SpecificTings room_code="JAAAHN" />
        </div>
    );
}

export default TryApolloPage
