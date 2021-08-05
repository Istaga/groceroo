import React, { useState, useRef } from 'react'
import { 
    TextField, Button, Grid, Typography, FormHelperText, FormControl, FormControlLabel, Radio, RadioGroup
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import {
    useQuery
} from "@apollo/client";


const CreateGroupPage = () => {
    const [title, setTitle] = useState("Groceries");
    const titleFieldRef = useRef();

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
                <Button color="secondary" variant="contained" onClick={() => console.log("title is " + title)}>
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

export default CreateGroupPage