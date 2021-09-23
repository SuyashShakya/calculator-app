import React from 'react';
import { createTheme, ThemeProvider} from '@material-ui/core/styles';
import Calculator from './components/calculator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#242D44'
    },
    secondary: {
      main: '#D2CDCD'
    },
  },
});



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Calculator />
    </ThemeProvider>
  )
}

export default App;