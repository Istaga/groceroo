import React from 'react'
import { useLocation } from "react-router-dom";
import { 
    Grid, Typography
} from '@material-ui/core';
import ItemTable from './ItemTable';

const GroceriesPage = (props) => {
    const groceryInfo = useLocation().state;
    const title = groceryInfo[0];
    const code = groceryInfo[1];
    const items = groceryInfo[2];
    
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
                <ItemTable code={code} items={items} />
            </Grid>
        </Grid>
    )
}

export default GroceriesPage
