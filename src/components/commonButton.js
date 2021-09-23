import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    button: {
      width: 110,
      height: 65,
      borderRadius: 10,
      boxShadow: 'inset 0px -4px 0px #3a4663',
      '&.del': {
        backgroundColor: '#647198'
      },
      '&.reset': {
        width: 230,
        backgroundColor: '#647198'
      },
      '&.equalsTo': {
        width: 230,
        backgroundColor: '#D03F2F'
      }
    },
    buttonText: {
      color: '#ffff'
    }
  
}))

const ButtonCompo = ({ onClick, children, buttonprops, uncommon}) => {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
      <Button variant='contained' className={`${classes.button} ${buttonprops}`} onClick={onClick}>
        <Typography variant={isSmallScreen ? 'h5' : 'h4'} className={uncommon ? classes.buttonText : ''}><b>{children}</b></Typography>
      </Button>
    )
}

export default ButtonCompo;