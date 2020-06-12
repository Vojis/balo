import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontSize: 16,
    xsFont: 14,
  },
  colors: {
    darkPurple: '#3b328f',
    lightPurple: '#b2ade3',
    purpleish: '#dbd0ef',
    navbarPurple: '#7c74cf'
  },
  spacing: 8,
});

const GlobalStyleProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
);

export default GlobalStyleProvider;
