import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
        main: '#047857',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#E6F1EE"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            background: '#FFFFFF',
          }
        }
      }
    }
  }
});

export default theme;