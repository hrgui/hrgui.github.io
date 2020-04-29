import React from 'react';
import ThemeProvider from './ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

export default ({children}) => {
  return <>
  <CssBaseline />
  <ThemeProvider>
    {children}
  </ThemeProvider>
  </>
};