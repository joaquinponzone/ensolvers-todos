import { createTheme } from "@material-ui/core";


export const lightTheme = createTheme({
  palette: {
    primary: {
      main:'#ffb74d'
    },
    secondary:{
      main: '#3f51b5'
    },
    type: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});