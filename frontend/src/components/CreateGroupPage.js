import React, { useState, useRef } from 'react'
import { 
    TextField, Button, Grid, Typography, FormHelperText, FormControl, FormControlLabel, Radio, RadioGroup
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import {
    useMutation,
} from "@apollo/client";
import { CREATE_ROOM_MUTATION } from '../gql/Queries';


const CreateGroupPage = () => {
    let roomID = '';
    const [title, setTitle] = useState("Groceries");
    const [retrievedCode, setCode] = useState("AAAAAAAA");
    const titleFieldRef = useRef();
    const [ makeRoom, {data, loading, error} ] = useMutation(CREATE_ROOM_MUTATION,
        {
            variables: { 
                title: title,
                code: '',
            },
            notifyOnNetworkStatusChange: true,
            onCompleted: async({ makeRoom }) => {
                if(data === undefined){
                    console.log("Undefined slur");
                }
                console.log("What's this loading business: ");
                console.log("Loading: " + loading);
                console.log("oi fack cant ees an error");
                console.log("The error is " + error);
            }
        }
    );

    const btnHandler =  () => {

    }

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
                <Link to={{pathname: `/rooms/${roomID}`, state: retrievedCode}}>
                    <Button
                    color="secondary" 
                    variant="contained" 
                    onClick={() => makeRoom()}
                    >
                        Create a grocery list
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" to="/" component={Link}>
                    Back to Home
                </Button>
            </Grid>
        </Grid>
    );
}

export default CreateGroupPage