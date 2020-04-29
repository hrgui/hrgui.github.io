import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"

const Wrapper = styled.div`
  display: inline;

  a {
    text-decoration: none;
    color: inherit;
  }

  & span {
    letter-spacing: -5px;
    font-family: 'Roboto Mono', monospace;
  }

  .gui {
    color: ${({theme}) => theme.palette.primary.main};
  }
`

export default ({ variant = "h4", className, ...props}:  {variant?, className?}) => {
  return (
    <Wrapper className={className} {...props}>
      <a href="/">
        <Typography variant={variant}>
          <span className="hr">hr</span>
          <span className="gui">gui</span>
        </Typography>
      </a>
    </Wrapper>
  )
}
