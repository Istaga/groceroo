import React from 'react';
import {
    useMutation, useLazyQuery, useQuery
} from "@apollo/client";
import { CREATE_ROOM_MUTATION, GET_RECENT_ROOM } from '../gql/Queries';

const GroceriesPage = () => {
    const { state } = this.props.location;
    let passedData = state;
    const title = passedData[0];
    const code = passedData[1];

    return (
        <div>
            <h2>{title}</h2>
            <h4>{code}</h4>
        </div>
    );
}

export default GroceriesPage

