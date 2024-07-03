'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
        
  },
  palette: {
    mode: 'dark',
  },
  components: {
   
    MuiContainer: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          marginTop: 100,
          
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          width: '100%',
         
          display: 'flex',
          justifyContent: 'space-around',
          border: '1px solid lightgray',
          borderRadius: 10,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          width: '100%',
          margin: 'auto',

        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          width: '70%',
          fontFamily: roboto.style.fontFamily,
          fontSize: 20,

        },
      },
    },
  },
});

export default theme;
