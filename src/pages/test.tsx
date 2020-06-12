import React from 'react'
import Paragraph from '../components/Paragraph';
import BodyContainer from '../components/BodyContainer';
import Layout from '../components/Layout'
import styled from 'styled-components';
import {BgHeader, Header, Title} from '../templates/blogTemplate';

const Styles = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  margin-top: 100px;
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

  p {
    font-size: 21px;

    ${({theme}) => theme.breakpoints.down('sm')} {
      font-size: 16px;
    }
  }

  blockquote {
    border-left: 3px solid #ccc;
    padding-left: 16px;
    margin-left: 8px;
    color: #666;
  }

  a:link, a:visited {
    color: #cc0000;
  }
`;

const SecondPage = () => (
  <Layout isBreakout>
    <BodyContainer flexCenter>
      <BgHeader />
      <Header>
        <Title>My Test Page</Title>
      </Header>
      <Styles>
        <h1>Heading 12</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <Paragraph>Lorem ipsum dolor sit amet, vel ad errem tantas vivendo, vel in eius assentior. Quando nominati salutandi ei sed. Sea porro noster forensibus eu, ipsum dolorum vocibus vim et. Est te nobis commodo liberavisse.</Paragraph>
        <Paragraph>Qui periculis efficiantur eu, modus mediocrem vis te. Ex velit consequuntur sit. Quo numquam assueverit ei, vivendum insolens cum an. Utinam apeirian no pro. Ut mel zril expetenda.</Paragraph>
      </Styles>
    </BodyContainer>
  </Layout>
)

export default SecondPage
