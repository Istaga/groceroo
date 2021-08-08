import React, { useState, useRef } from 'react'
import { 
    TextField, Button, Grid, Typography, FormHelperText, FormControl, FormControlLabel, Radio, RadioGroup
} from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

import {
    useMutation, useLazyQuery, useQuery
} from "@apollo/client";
import { CREATE_ROOM_MUTATION, GET_RECENT_ROOM } from '../gql/Queries';


const CreateGroupPage = (props) => {
    let info = [];
    const [title, setTitle] = useState("Groceries");
    const [retrievedCode, setCode] = useState("AAAAAAAA");
    const titleFieldRef = useRef();
    const recentRoom = useQuery(GET_RECENT_ROOM);
    const [ makeRoom ] = useMutation(CREATE_ROOM_MUTATION,
        {
            variables: { 
                title: title,
                code: '',
            },
            onCompleted: (data) => {
                // I know I should use the response object but it's undefined god knows why
                setCode(data.createGroceries.groceries.code);
                info.push(title, data.createGroceries.groceries.code);
                console.log(info);
                props.history.push(
                    { pathname: '/rooms/', state: info }
                );
            }
        }
    ); 


    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography component="h2">
                    Create A Grocery List!
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
                <Button color="primary" variant="contained" to="/" component={Link}>
                    Back to Home
                </Button>
            </Grid>
        </Grid>
    );
}

export default withRouter(CreateGroupPage);