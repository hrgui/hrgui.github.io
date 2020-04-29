import React from "react"
import PropTypes from "prop-types"
import LayoutController from "./LayoutController"
import styled from "styled-components"
import AppBar from "./AppBar"
import Container from "./Container"
import Footer from "./Footer"
import './layout.css';


const ContentContainer = styled.div``;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  & > ${ContentContainer} {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }

  & > footer {
    padding: ${({ theme }) => theme.spacing(2)}px;
    padding-top: ${({ theme }) => theme.spacing(4)}px;
    padding-bottom: ${({ theme }) => theme.spacing(4)}px;
    margin-top: auto;
    color: #fafafa;
    background: #222;
  }
`

const Layout = ({ children, sideMenu, isBreakout = false}: {children?, sideMenu?, isBreakout?}) => {
  return (
    <LayoutController>
      <AppBar />
      <LayoutContainer>
        <ContentContainer>
          {sideMenu}
          {isBreakout ? children : <Container>{children}</Container>}
        </ContentContainer>
        <Footer />
      </LayoutContainer>
    </LayoutController>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
