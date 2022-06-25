import logo from './logo.svg';
import { colors, createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import { Button } from '@mui/material'
import Example1 from './components/Example1';
import Example2 from './components/Example2';
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Example3 from './components/Example3';
import { color } from '@mui/system';

const theme = createTheme({
  status:{
    danger:'#e53e3f'
  },
  palette: {
    secondary: {
      main: colors.orange[500]
    }
  },
  // neutral: {
  //   main: color.grey[500],
  // }
})



function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="App">
          {/* <Example1 /> */}
          <Example2 />
          {/* <Example3 /> */}
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
