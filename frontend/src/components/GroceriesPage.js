import React, { useState, useRef } from 'react'
import { useLocation } from "react-router-dom";
import { 
    Paper, TextField, Button, Grid, Typography, FormHelperText, FormControl, 
    FormControlLabel, Radio, RadioGroup, Box
} from '@material-ui/core';
import yellow from "@material-ui/core/colors/yellow";
import { makeStyles } from "@material-ui/core/styles";
import ItemTable from './ItemTable';

const useStyles = makeStyles((theme) => ({
    noteBorder: {
        border: `1px solid ${yellow[200]}`,
        borderRadius: 11
    },
}));

const GroceriesPage = (props) => {
    const [itemName, setItemName] = useState("Beans");
    const itemNameRef = useRef();
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
                <Grid container item xs={4} align='left'>
                    <Grid item xs={12} align="center">
                        <Paper className={classes.noteBorder}>
                            <FormControl>
                                <TextField
                                    inputRef={itemNameRef}
                                    onChange={() => setItemName(itemNameRef.current.value)}
                                    required={true}
                                    defaultValue="Beans"
                                />
                                <FormHelperText text-align="center">
                                    What are you shopping for?
                                </FormHelperText>
                            </FormControl>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                            color="secondary" 
                            variant="contained" 
                            onClick={ItemTable.addData(itemName, 1, 'can')}
                        >
                            Add Item
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={8} align='right'>
                    <Paper className={classes.noteBorder}>
                        <ItemTable />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default GroceriesPage
