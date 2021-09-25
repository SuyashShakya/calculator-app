import React from 'react';
import isEmpty from 'lodash/isEmpty'
import includes from 'lodash/includes';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import {makeStyles} from '@material-ui/core/styles';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ButtonCompo from './commonButton';

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        backgroundColor: checked => checked ? theme.palette.primary.light : theme.palette.secondary.light ,
        color: checked => checked ? '#ffff' : '#000000' 
    },
    textField: {
        marginTop: 10,
        marginBottom: 20,
        direction: 'rtl',
        borderRadius: 10,
        backgroundColor: checked => checked ? theme.palette.primary.dark : theme.palette.secondary.dark,
    },
    inputStyle: {
        color: checked => checked ? '#ffff' : '#000000',
        fontSize: 48
    },
    buttonBox: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: checked => checked ? theme.palette.primary.main : theme.palette.secondary.main,
        borderRadius: 10,
        padding: 25,
        gap: 25,
        [theme.breakpoints.down('sm')]: {
            padding: 15,
            gap: 15
        },
    },
    buttonSecondaryBox: {
        display: 'flex', 
        gap: 25,
        [theme.breakpoints.down('sm')]: {
            gap: 15
        },
      
    },
  
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
        },
    },
    buttonText: {
        color: '#ffff'
    },
    themeToggle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    customRadioButton: {
        width: 20,
        height: 20,
        border: '2px solid #444',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        width: 'calc(100% - 6px)',
        height: 'calc(100% - 6px)',
        backgroundColor: 'hsl(6, 63%, 50%)',
        borderRadius: '50%',
        display: 'inline-block',
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },


  
}))

const Calculator = () => {
    const [value, setValue] = React.useState(0);
    const [operator, setOperator] = React.useState('')
    const [firstTerm, setFirstTerm] = React.useState(0)
    const [secondTerm, setSecondTerm] = React.useState(0)
    const [checked, setChecked] = React.useState(false)
    const classes = useStyles(checked);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const performOperation = (op) => {
        if(!isEmpty(operator)){
            return
        } else {
            setOperator(op)
        }
    }
    const handleClick = (num) => {
        if(isEmpty(operator)) {
            if(value === 0){
                setValue(num)
                setFirstTerm(num)
            } else if (num === 'dot') {
                if(includes(value,'.')){
                    return
                }
                setValue(value + '.')
            }
            else {
                setValue("" + value + num)
                setFirstTerm("" + value + num)
            } 
        } else {
            if(secondTerm === 0){
                setValue(num)
                setSecondTerm(num)
            } else if (num === 'dot') {
                if(includes(value,'.')){
                    return
                }
                setFirstTerm(value)
                setSecondTerm("" + secondTerm + '.')
                setValue("" + secondTerm + '.')
            } else {
                setSecondTerm("" + secondTerm + num)
                setValue("" + secondTerm + num)
            } 
        }
    }
    const getResult = () => {
        if(!isEmpty(operator)){
            let result;
            if(operator === '+'){
                result = parseFloat(firstTerm)+parseFloat(secondTerm)
                setValue(result)  
            } else if (operator === '-'){
                result = parseFloat(firstTerm)-parseFloat(secondTerm)
                setValue(result)  
            } else if (operator === '*'){
                result = parseFloat(firstTerm)*parseFloat(secondTerm)
                setValue(result)  
            } else if (operator === '/'){
                result = parseFloat(firstTerm)/parseFloat(secondTerm)
                setValue(result)  
            } else {
                setValue(0)
            }
            setOperator('')
            setFirstTerm(result)
            setSecondTerm(0)
        }
    }
    const reset = () => {
        setValue(0)
        setFirstTerm(0)
        setOperator('')
        setSecondTerm(0)
    }

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }
    
    const val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return (
        <Box className={classes.root}>
            <Box disply='flex' flexDirection='column' width={isSmallScreen ? 350 : 540}>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='h4'>
                    calc
                    </Typography>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                        <Typography variant='subtitle2'>Theme</Typography>
                        <Switch
                            onChange={handleChange}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Box>
                </Box>
                <TextField
                    fullWidth
                    variant='outlined'
                    className={classes.textField}
                    inputProps={{className: classes.inputStyle}}
                    value={val}
                    disabled
                />
                <Box className={classes.buttonBox}>
                    <Box className={classes.buttonSecondaryBox}>
                        <ButtonCompo onClick={() => handleClick(7)}>7</ButtonCompo>
                        <ButtonCompo onClick={() => handleClick(8)}>8</ButtonCompo>
                        <ButtonCompo onClick={() => handleClick(9)}>9</ButtonCompo>
                        <ButtonCompo onClick={() => setValue(Math.floor(value / 10))} buttonprops='del' uncommon>Del</ButtonCompo>
                    </Box>
                    <Box className={classes.buttonSecondaryBox}>
                        <ButtonCompo onClick={() => handleClick(4)}>4</ButtonCompo>
                        <ButtonCompo onClick={() => handleClick(5)}>5</ButtonCompo>
                        <ButtonCompo onClick={() => handleClick(6)}>6</ButtonCompo>
                        <ButtonCompo onClick={() => performOperation('+')}>+</ButtonCompo>
                    </Box>
                    <Box className={classes.buttonSecondaryBox}>
                        <ButtonCompo onClick={() => handleClick(1)}>1</ButtonCompo>
                        <ButtonCompo onClick={() => handleClick(2)}>2</ButtonCompo>
                        <ButtonCompo onClick={() => handleClick(3)}>3</ButtonCompo>
                        <ButtonCompo onClick={() => performOperation('-')}>-</ButtonCompo>
                    </Box>
                    <Box className={classes.buttonSecondaryBox}>
                        <ButtonCompo onClick={() => handleClick('dot')}>.</ButtonCompo>
                        <ButtonCompo onClick={() => handleClick(0)}>0</ButtonCompo>
                        <ButtonCompo onClick={() => performOperation('/')}>/</ButtonCompo>
                        <ButtonCompo onClick={() => performOperation('*')}>×</ButtonCompo>
                    </Box>
                        <Box className={classes.buttonSecondaryBox}>
                        <ButtonCompo onClick={reset} buttonprops='reset' uncommon>RESET</ButtonCompo>
                        <ButtonCompo onClick={getResult} buttonprops='equalsTo' uncommon>=</ButtonCompo>
                    </Box>
                </Box>
            </Box>  
        </Box>
    )
}

export default Calculator;