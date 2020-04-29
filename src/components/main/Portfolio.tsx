import React from 'react'
import styled from 'styled-components'
import { Tabs, Tab, Grid } from '@material-ui/core'
import {Link, useStaticQuery, graphql} from 'gatsby';
import Container from '../Container';


const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  margin-bottom: 20px;
  font-family: ${props => props.theme.altFontFamily};

  ${({theme}) => theme.breakpoints.down('sm')} {
    font-size: 1.5rem;
    line-height: 3rem;
  }
`

const StyledContainer = styled.div`
  color: #222;
  padding: ${({ theme }) => theme.spacing(3)}px;
  padding-top: ${({ theme }) => theme.spacing(8)}px;
  padding-bottom: ${({ theme }) => theme.spacing(11)}px;
  width: 100%;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23e2e2e2' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`

const PortfolioCards = styled(Grid)`
  display: flex;
  width: 100%;
`

const PortfolioCard = styled(Grid)`
  background: white;
  display: block;
  overflow: hidden;
  flex-direction: column;
  position: relative;
  min-width: 33%;
  height: ${({ theme }) => theme.spacing(25)}px;
  background: url(${props => props.src}) no-repeat center;
  cursor: pointer;

  ${({theme}) => theme.breakpoints.down('sm')} {
    width: 100%;
    margin-bottom: ${props => props.theme.spacing(3)}px;
  }
`

const PortfolioLink = styled(Link)`
  position: absolute;
  padding: ${({theme}) => theme.spacing(1)}px;
  bottom: 0;
  background: #d7f1fe;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  color: #222;
  transition: 250ms all ease-in-out;

  &:hover {
    background: #6f7b81;
    color: white;
  }
`

const Inner = styled.div`
  width: 100%;
`

const PortfolioTabs = styled(Tabs).attrs({
  textColor: 'primary',
  indicatorColor: 'primary',
})`
  color: #222;
  margin-bottom: ${props => props.theme.spacing(3)}px;
`

const PortfolioTab = styled(Tab)`
  color: #222;
`

/**
Github Projects
- Chord Charts (todo)
- mobx-form-model (todo)
- Kirby
- Angry Bird
- Tetris

Old Academic Projects / Work
- USC Viterbi School of Engineering
- VKEY
 */

export function transformPortfolioQueryResponseToNormalizedForm({edges}) {
  return edges.map(({node}) => {
    return {
      ...node.frontmatter,
      thumbnail: node.frontmatter.thumbnail && node.frontmatter.thumbnail.publicURL
    }
  });
}


export default function Portfolio(props) {
  const {githubData, workData} = useStaticQuery(graphql`
  {
    githubData: allMarkdownRemark(filter: {frontmatter: {category: {eq: "github"}}}) {
      edges {
        node {
          frontmatter {
            title
            path
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
    workData: allMarkdownRemark(filter: {frontmatter: {category: {eq: "work"}}}) {
      edges {
        node {
          frontmatter {
            title
            path
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
  }`);

const githubProjects = transformPortfolioQueryResponseToNormalizedForm(githubData)
const workProjects = transformPortfolioQueryResponseToNormalizedForm(workData);

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  //TODO: 0 is github, 1 is work
  const projects = !value ? githubProjects : workProjects;

  return (
    <StyledContainer>
      <Container>
        <Inner>
          <Title>Portfolio</Title>
          <PortfolioTabs value={value} onChange={handleChange}>
            <PortfolioTab label={'Github Projects'} />
            <PortfolioTab label={'Academic Projects / Work'} />
          </PortfolioTabs>
          <PortfolioCards container spacing={2}>
            {projects.map(({title, path, thumbnail}) => (
              <PortfolioCard item onClick={() => props.navigate(path)} sm={4} src={(thumbnail) || "https://placekitten.com/340/200"}>
                <PortfolioLink to={path}>{title}</PortfolioLink>
              </PortfolioCard>
            ))}
          </PortfolioCards>
        </Inner>
      </Container>
    </StyledContainer>
  )
}
