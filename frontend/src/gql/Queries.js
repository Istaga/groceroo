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


export const MAKE_ROOM_MUTATION = gql`
    mutation createGroceries($code: String = "JAAAHN", $title: String = "Chinese stuff"){
        createGroceries(code: $code, title: $title) {
        groceries {
            title
            id
            code
        }
        }
    }
`