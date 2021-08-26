import React, { useState, useRef } from 'react'
import { 
    TextField, Button, Grid, FormHelperText, FormControl, 
    Popper, makeStyles, Typography, DialogTitle,
    Paper, DialogActions, DialogContent, DialogContentText,
} from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import {
    useLazyQuery
} from "@apollo/client";
import { FIND_ITEMS_OF_LIST, GET_ROOM_QUERY } from '../gql/Queries';
import { AlphaButton, BetaButton } from './StyledBtns';

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
    const [title, setTitle] = useState("No list found.");
    const [retrievedCode, setCode] = useState("HRRCOAC");
    const [itemList, setItemList] = useState([]);
    const [targetValid, setTargetValid] = useState(false);
    const codeFieldRef = useRef();
    const [ getTitle ] = useLazyQuery(GET_ROOM_QUERY,
        {
            variables: { 
                code: retrievedCode,
            },
            onCompleted: (shrigma) => {
                setTitle(shrigma.pacificRoom.title);
                setTargetValid(true);
            },
            onError: (error) => {
                setTitle("No list matching code given");
                setTargetValid(false);
            },
            fetchPolicy: "no-cache",
        }
    );

    const [ getItems ] = useLazyQuery(FIND_ITEMS_OF_LIST,
        {
            variables: { 
                code: retrievedCode,
            },
            onCompleted: (shrigma) => {
                setItemList(shrigma.pacificItems);
                setTargetValid(true);
            },
            onError: (error) => {
                setItemList([]);
            },
        }
    );

    // MUI popper
    const anchorRef = React.useRef(null);
    const [arrow, setArrow] = React.useState(false);
    const [arrowRef, setArrowRef] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const id = open ? 'scroll-playground' : null;

    const handleClickButton = () => {
        setOpen((prevOpen) => !prevOpen);
        getTitle();
        getItems();
    };

    const handleWrongButton = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleJoinButton = () => {
        const info = [title, retrievedCode, itemList];
        
        if( targetValid ){
            props.history.push(
                { pathname: '/rooms/', state: info }
            );
        }
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align='center'>
                <Typography style={{color: '#636e72', fontWeight: 'bold'}} variant="h2">
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
                        Use the 7-character code here. Try "HRRCOAC"
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <AlphaButton
                    ref={anchorRef}
                    aria-describedby={id}
                    color="secondary" 
                    variant="contained" 
                    onClick={handleClickButton}
                >
                    See what's on the list
                </AlphaButton>
                <Popper
                    id={id}
                    open={open}
                    anchorEl={anchorRef.current}
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
                    {arrow ? <span className={classes.arrow} ref={setArrowRef} /> : null}
                    <Paper className={classes.paper}>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogContent>
                        <DialogContentText>Is this the list you were looking for?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleWrongButton} color="primary">
                            Wrong one.
                        </Button>
                        {targetValid ? 
                            <Button onClick={handleJoinButton} color="primary">
                                Join list
                            </Button> 
                            : 
                            null}
                        </DialogActions>
                    </Paper>
                </Popper>
            </Grid>
            <Grid item xs={12} align="center">
                <BetaButton color="primary" variant="contained" to="/create" component={Link}>
                    I don't have a list
                </BetaButton>
            </Grid>
        </Grid>
    );
}

export default withRouter(JoinGroupPage);