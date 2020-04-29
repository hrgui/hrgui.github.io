import styled from 'styled-components';

export default styled.div`
  padding:${props => props.padding !== undefined ? props.padding : '20px'};
  padding-top: 64px;
`;