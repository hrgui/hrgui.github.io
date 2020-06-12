import React from 'react'
import Paragraph from '../components/Paragraph';
import BodyContainer from '../components/BodyContainer';
import Layout from '../components/Layout'
import styled from 'styled-components';
import {BgHeader, Header, Title} from '../templates/blogTemplate';
import {Link, useStaticQuery, graphql} from 'gatsby';
import Portfolio from '../components/main/Portfolio';

const Styles = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  margin-top: 64px;
  line-height: 1.6;
  padding-left: 16px;
  padding-right:16px;

  ${({theme}) => theme.breakpoints.down('sm')} {
    padding-left: 24px;
    padding-right:24px;
  }

  h2, h3, h4, h5 {
    margin: 0;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .linkTitle {
    text-decoration: none;
  }

  h2 {
    font-size: 36px;
    margin-bottom:0;
    font-weight:300;
  }

  h4 { 
    margin-top: 0;
  }

  p {
    font-size: 21px;

    ${({theme}) => theme.breakpoints.down('sm')} {
      font-size: 16px;
    }
  }

  .blogExcerpt {
    margin-bottom: 64px;
    margin-top: 32px;
  }

  a:link, a:visited {
    color: #cc0000;
  }
`;

const PortfolioIndexPage = (props) => {
  

  return <Layout isBreakout>
    <BodyContainer flexCenter>
      <Portfolio {...props} />
    </BodyContainer>
  </Layout>
};

export default PortfolioIndexPage;
