import React from 'react';
import Container from './Container';

export default () => {
  return <footer>
    <Container>
      © {new Date().getFullYear()} hrgui
    </Container>
  </footer>
}