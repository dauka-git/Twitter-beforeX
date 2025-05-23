import { createTheme } from '@mui/material/styles';

import {red} from '@mui/material/colors'

const theme = createTheme({
    typography: {
        fontFamily: [
            'system-ui', 
            '-apple-system', 
            'BlinkMacSystemFont',
            'Segoe UI', 
            'Roboto', 
            'Ubuntu',
            'Helvetica Neue',
            'sans-serif',

        ].join(','),
    },

    palette: {

       
        primary:{
            main: 'rgb(29, 161, 242)',
            dark: 'rgb(26, 145, 218)',
            contrastText: '#fff',
        }, 
        secondary: {
            main: 'rgb(26, 145, 218)',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },

    components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 30,
              textTransform: 'none',
              fontSize: 16,
              height: 40,
              fontWeight: 700,
            },
            textPrimary: {
              paddingLeft: 20,
              paddingRight: 20,
            },
            outlinedPrimary: {
              borderColor: 'rgb(29, 161, 243)',
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            underline: {
              '&:after': {
                borderBottomWidth: '2px',
              },
              '&:before': {
                borderColor: '#000',
                borderBottomWidth: '2px',
              },
            },
            input: {
              backgroundColor: 'rgb(245, 248, 250)',
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: 15,
            },
          },
        },
        MuiDialogActions: {
          styleOverrides: {
            root: {
              marginBottom: 8,
            },
          },
        },
        MuiDialogTitle: {
          styleOverrides: {
            root: {
              borderBottom: '1px solid rgb(204, 230, 230)',
              marginBottom: 10,
              padding: '10px 15px',
              '& h2': {
                display: 'flex',
                alignItems: 'center',
                fontWeight: 800,
              },
              '& button': {
                padding: 8,
                marginRight: 20,
              },
            },
          },
        },
      },
    });

export default theme;
    