import React from 'react';
import Container from '@material-ui/core/Container';

/**
 * This component just centers the content.
 * Defaults to "xl" instead default of "lg" provided by material-ui
 */
export default (props) => {
  return <Container maxWidth="xl" {...props} />
};
