
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    papa: {
        justifyContent: 'space-between',
        backgroundColor: '#2d3436',
    },
    button: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    divider: {
        height: 28,
        margin: 8,
        marginRight: theme.spacing(2),
    },
  }));

const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.papa}>
                    <IconButton href="/" edge="start" className={classes.button} color="inherit" aria-label="menu">
                        <HomeIcon />
                    </IconButton>
                    <IconButton edge="start" href="https://github.com/Istaga/groceroo" className={classes.button} color="inherit" aria-label="menu">
                        <Typography variant="h6" className={classes.title}>
                            See code 
                        </Typography>
                        <GitHubIcon className={classes.button} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar