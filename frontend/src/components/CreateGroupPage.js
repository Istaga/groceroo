import React, { useState, useRef } from 'react'
import { 
    TextField, Button, Grid, Typography, FormHelperText, FormControl, withStyles
} from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import {
    useMutation
} from "@apollo/client";
import { CREATE_ROOM_MUTATION } from '../gql/Queries';
import { AlphaButton, BetaButton } from './StyledBtns';


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
                <Typography style={{color: '#636e72', fontWeight: 'bold'}} variant="h2">
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
                <AlphaButton
                    color="primary"
                    variant="contained" 
                    onClick={() => {makeRoom()}}
                >
                    Create a grocery list
                </AlphaButton>
            </Grid>
            <Grid item xs={12} align="center">
                <BetaButton color="primary" variant="contained" to="/join" component={Link}>
                    Join a list
                </BetaButton>
            </Grid>
        </Grid>
    );
}

export default withRouter(CreateGroupPage);