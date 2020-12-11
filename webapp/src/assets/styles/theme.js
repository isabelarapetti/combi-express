import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4dabf5',
      main: '#2196f3',
      dark: '#1769aa',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffa733',
      main: '#ff9100',
      dark: '#E63B0E',
      contrastText: '#000',
    },
  },
});

export { theme };
