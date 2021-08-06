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
    const roomLinkRef = useRef(1);
    const [ makeRoom ] = useMutation(CREATE_ROOM_MUTATION);
    const [data, setData] = useState()
    const [error, setError] = useState()


    const btnHandler =  () => {

        try {
            const { data } = makeRoom(
                {
                variables: { 
                    title: title,
                    code: '',
                }
            })
            if(data === undefined){
                console.log("data is undefined")
            }
            setData(data);
            setCode(data.pacificRoom.code);
            console.log("The data is " + data);
        }
        catch (e) {
            setError(e)
            console.log("oi fack cant ees an error");
            console.log("The error is " + e);
        }

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
                    onClick={
                        () => btnHandler()
                    }
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