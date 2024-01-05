import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
        main: '#047857',
    }
  },
});

export default theme;