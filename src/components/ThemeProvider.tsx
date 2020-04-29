import React from 'react';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core';
import {ThemeProvider} from 'styled-components';
import _theme from './theme';

const AppThemeProvider = ({children}) => {
  const theme = createMuiTheme(_theme);
  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeProvider>
  )
};

export default AppThemeProvider;