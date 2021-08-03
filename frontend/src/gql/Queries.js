import { gql } from '@apollo/client';

export const ALL_ROOMS_QUERY = gql`
    query showGroceryLists {
        allGroceries{
        id
        title
        code
        }
    }
`

export const GET_ROOM_QUERY = gql`
    query findSpecificList ($code: String!) {
        pacificRoom(code: $code){
        id
        title
        code
        }
    }
`