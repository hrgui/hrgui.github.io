import styled from 'styled-components';

export default styled.div<{flexCenter?}>`
  width: ${props => props.theme.bodyWidth}
  ${props => props.flexCenter && `
  display: flex;
  align-items: center;
  margin: 0 auto;`}
`;