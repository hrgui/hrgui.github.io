import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout'
import BodyContainer from '../components/BodyContainer';
import { graphql } from "gatsby"

const Title = styled.h1`
  margin: 0;
  font-size: 3rem;

  ${({theme}) => theme.breakpoints.down('sm')} {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;


const Styles = styled.div`
  margin-top: 80px;
  width: 100%;

  h1, h2, h3, h4, h5 {
    margin: 0;
  }
`;


const BlogPage = ({title, content}) => (
  <Layout>
    <BodyContainer flexCenter>
      <Styles>
        <Title>{title}</Title>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Styles>
    </BodyContainer>
  </Layout>
);



export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`


export default ({data}) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return <BlogPage title={frontmatter?.title} content={html} />
};
