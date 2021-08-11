import React, { useState, useRef } from 'react'
import { 
    TextField, Button, Grid, Typography, FormHelperText, FormControl,
} from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

import {
    useMutation
} from "@apollo/client";
import { CREATE_ROOM_MUTATION } from '../gql/Queries';


const CreateGroupPage = (props) => {
    let info = [];
    const [title, setTitle] = useState("Groceries");
    const [retrievedCode, setCode] = useState("AAAAAAAA");
    const titleFieldRef = useRef();

    const [ makeRoom ] = useMutation(CREATE_ROOM_MUTATION,
        {
            variables: { 
                title: title,
                code: '',
            },
            onCompleted: (data) => {
                setCode(data.createGroceries.groceries.code);
                info.push(title, data.createGroceries.groceries.code);
                props.history.push(
                    { pathname: '/rooms/', state: info }
                );
            }
        }
    ); 


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align='center'>
                <Typography variant="h2">
                    Create A Grocery List
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <FormControl>
                    <TextField
                        inputRef={titleFieldRef}
                        onChange={() => setTitle(titleFieldRef.current.value)}
                        required={true}
                        defaultValue={title}
                    />
                    <FormHelperText text-align="center">
                        Name your list here
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    color="secondary" 
                    variant="contained" 
                    onClick={() => {makeRoom()}}
                >
                    Create a grocery list
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" to="/join" component={Link}>
                    Join a list
                </Button>
            </Grid>
        </Grid>
    );
}

export default withRouter(CreateGroupPage);