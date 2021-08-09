import React, { useState, useRef } from 'react'
import { useLocation } from "react-router-dom";
import { 
    Paper, TextField, Button, Grid, Typography, FormHelperText, FormControl, 
    FormControlLabel, Radio, RadioGroup, Box
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ItemTable from './ItemTable';

const useStyles = makeStyles((theme) => ({
    
}));

const GroceriesPage = (props) => {
    const groceryInfo = useLocation().state;
    const title = groceryInfo[0];
    const code = groceryInfo[1];
    const classes = useStyles();
    
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} align='center'>
                <Typography variant="h2">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'> 
                <Typography variant="h5">
                    Invite someone with list code {code}
                </Typography>
            </Grid>
            <Grid container item xs={12} spacing={8}>
                <ItemTable />
            </Grid>
        </Grid>
    )
}

export default GroceriesPage
