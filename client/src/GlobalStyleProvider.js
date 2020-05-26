import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontSize: 16,
  },
  colors: {
    darkPurple: '#3b328f',
    purpleish: '#dbd0ef'
  },
  spacing: 8,
});

const GlobalStyleProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
);

export default GlobalStyleProvider;
