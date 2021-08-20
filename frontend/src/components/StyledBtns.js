import { Button, withStyles } from '@material-ui/core'

const AlphaButton = withStyles((theme) => ({
    root: { 
      backgroundColor: '#0984e3',
      '&:hover': {
        backgroundColor: '#34ace0',
      },
    },
}))(Button);

const BetaButton = withStyles((theme) => ({
    root: { 
      backgroundColor: '#218c74',
      '&:hover': {
        backgroundColor: '#33d9b2',
      },
    },
}))(Button);

export { AlphaButton, BetaButton };