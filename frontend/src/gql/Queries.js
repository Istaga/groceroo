import { gql } from '@apollo/client';

export const GET_RECENT_ROOM = gql`
    query getLastRoom{
        lastRoom{
            id
            title
            code
        }
    }
`

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


export const CREATE_ROOM_MUTATION = gql`
    mutation createGroceries($code: String!, $title: String!){
        createGroceries(code: $code, title: $title) {
            groceries {
                title
                id
                code
            }
        }
    }
`

export const DELETE_ROOM_MUTATION = gql`
    mutation deleteGroceries($code: String!){
        deleteGroceries(code: $code){
            groceries {
                id
                code
                title
            }
        }
    }
`

export const FIND_ITEMS_OF_LIST = gql`
    query findItemsOfList($code: String!) {
        pacificItems(code: $code){
            id
            name
            quantity
            units
            list {
                id
                title
                code
            }
        }
    }
`

export const ALL_ITEMS_QUERY = gql`
    query showAllItems {
        allItems {
            id
            name
            quantity
            units
            list {
                id
            }
        }
    }
`

export const UPDATE_ITEM_MUTATION = gql`
    mutation updateItem($id: ID!, $quantity: Float!){
        updateItem(id: $id, quantity: $quantity){
            item {
                id
                quantity
            }
        }
    }
`

export const CREATE_ITEM_MUTATION = gql`
    mutation createItem($name: String!, $quantity: Float!, $units: String!, $list_code: String!){
        createItem(name: $name, quantity: $quantity, units: $units, listCode: $list_code){
            item {
                id
                name
                quantity
                units
            }
        }
    }
`

export const DELETE_ITEM_MUTATION = gql`
    mutation deleteItem($id: ID!){
        deleteItem(id: $id){
            item {
                id
                name
                quantity
                units
            }
        }
    }
`