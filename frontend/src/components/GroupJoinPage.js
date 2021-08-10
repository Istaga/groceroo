import React, { useState, useRef } from 'react'
import { 
    TextField, Button, Grid, FormHelperText, FormControl, 
    Popper, makeStyles, FormControlLabel, HighlightedCode, Typography,
    Paper, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Switch,
} from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

import {
    useMutation, useQuery
} from "@apollo/client";
import { CREATE_ROOM_MUTATION, GET_RECENT_ROOM } from '../gql/Queries';

const useStyles = makeStyles((theme) => ({
    paper: {
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
    popper: {
        zIndex: 1,
        '&[x-placement*="bottom"] $arrow': {
          top: 0,
          left: 0,
          marginTop: '-0.9em',
          width: '3em',
          height: '1em',
          '&::before': {
            borderWidth: '0 1em 1em 1em',
            borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
          },
        },
        '&[x-placement*="top"] $arrow': {
          bottom: 0,
          left: 0,
          marginBottom: '-0.9em',
          width: '3em',
          height: '1em',
          '&::before': {
            borderWidth: '1em 1em 0 1em',
            borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
          },
        },
        '&[x-placement*="right"] $arrow': {
          left: 0,
          marginLeft: '-0.9em',
          height: '3em',
          width: '1em',
          '&::before': {
            borderWidth: '1em 1em 1em 0',
            borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
          },
        },
        '&[x-placement*="left"] $arrow': {
          right: 0,
          marginRight: '-0.9em',
          height: '3em',
          width: '1em',
          '&::before': {
            borderWidth: '1em 0 1em 1em',
            borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
          },
        },
      },
    arrow: {
        position: 'absolute',
        fontSize: 7,
        width: '3em',
        height: '3em',
        '&::before': {
          content: '""',
          margin: 'auto',
          display: 'block',
          width: 0,
          height: 0,
          borderStyle: 'solid',
        },
      },

  }));


const JoinGroupPage = (props) => {
    const classes = useStyles();
    let info = [];
    const [title, setTitle] = useState("Groceries");
    const [retrievedCode, setCode] = useState("AAAAAAAA");
    const titleFieldRef = useRef();
    const codeFieldRef = useRef();
    const [arrow, setArrow] = React.useState(false);
    const [arrowRef, setArrowRef] = React.useState(null);

    // MUI popper
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClickButton = () => {
        setOpen((prevOpen) => !prevOpen);
      };


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align='center'>
                <Typography variant="h2">
                    Weary, traveller? Grab food for us
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <FormControl>
                    <TextField
                        inputRef={codeFieldRef}
                        onChange={() => setCode(codeFieldRef.current.value)}
                        required={true}
                        defaultValue={retrievedCode}
                    />
                    <FormHelperText text-align="center">
                        Use the 8-character code here. Try "ABCDEFGH"
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    aria-describedby={id}
                    color="secondary" 
                    variant="contained" 
                    onClick={handleClick}
                >
                    See what's on the list
                </Button>
                <Popper
                    placement="top"
                    disablePortal={false}
                    modifiers={{
                    flip: {
                        enabled: true,
                    },
                    preventOverflow: {
                        enabled: true,
                        boundariesElement: 'scrollParent',
                    },
                    arrow: {
                        enabled: false,
                        element: arrowRef,
                    },
                    }}
                >
                    <span className={classes.arrow} ref={setArrowRef} />
                    <Paper className={classes.paper}>
                        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText>Let Google help apps determine location.</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClickButton} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={handleClickButton} color="primary">
                            Agree
                        </Button>
                        </DialogActions>
                    </Paper>
                </Popper>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" to="/create" component={Link}>
                    I don't have a list
                </Button>
            </Grid>
        </Grid>
    );
}

export default withRouter(JoinGroupPage);