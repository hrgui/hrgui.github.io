import React from "react"
import { AppBar as MuiAppBar, Toolbar } from "@material-ui/core"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Container from "./Container"
import Logo from "./Logo"
import styled from "styled-components"
import { Link } from "gatsby"

const StyledToolbar = styled(Toolbar)`
  height: 100%;
  align-items: baseline;
  /* this ensures AppBarContainer (the containing element of AppBar will fill up)  */
  flex-direction: column;
`;

const AppBarContainer = styled(Container)`
  display: flex;
  flex: 1;
  .menu-logo {
    cursor: pointer;
    flex-grow: 1;
    align-items: center;
    display: flex;
  }
`

const NavMenuContainer = styled.div`
  display: flex;
  align-items: center;

  .link {
    color: #cc0000;
    text-decoration: none;
    margin-left: 16px;
    margin-right: 16px;
    
    &.active {
      border-bottom: 2px solid #666;
    }
  }
`

export const NavMenu = () => {
  return (
    <NavMenuContainer>
      <Link className="link" activeClassName="active" to="/">home</Link>
      <Link className="link"activeClassName="active" partiallyActive={true}  to="/portfolio">portfolio</Link>
      <Link className="link"activeClassName="active" partiallyActive={true}  to="/blog">blog</Link>
      
    </NavMenuContainer>
  )
}

export default () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return (
    <MuiAppBar elevation={trigger ? 1 : 0} color="default" style={{
      background: !trigger ? 'transparent' : 'white'
    }}>
      <StyledToolbar disableGutters>
        <AppBarContainer>
          <Logo className="menu-logo" />
          <NavMenu />
        </AppBarContainer>
      </StyledToolbar>
    </MuiAppBar>
  )
}
