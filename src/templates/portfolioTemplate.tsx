import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout'
import BodyContainer from '../components/BodyContainer';
import { Button } from '@material-ui/core';
import {Pie} from 'react-chartjs-2';
import Slider from '../components/Slider';
import techColors from '../data/techColors';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { graphql } from "gatsby"

const Iframe = styled.iframe`
  width: 100%;
  border: 0;
  border-top: 3px solid #222;
  padding-top: ${props => props.theme.spacing(4)}px;
  padding-bottom: ${props => props.theme.spacing(4)}px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 3rem;

  ${({theme}) => theme.breakpoints.down('sm')} {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

const PortfolioHeader = styled.div`
  padding-top: calc(64px + ${props => props.theme.spacing(2)}px);
  display: flex;
  width: 100%;
  margin-bottom: 80px;

  ${({theme}) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    margin-bottom: ${props => props.theme.spacing(2)}px;
  }
`

const Inner = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const PortfolioDetails = styled.div`

`;


const PortfolioDetailsCard = styled.div`
  border-top: 2px solid #333;
  padding-top: ${props => props.theme.spacing(2)}px;
  margin-bottom: ${props => props.theme.spacing(8)}px;
`;

const PortfolioDetailsTitle = styled.h3`
  font-family: ${props => props.theme.altFontFamily};
  text-transform: uppercase;
  margin: 0;
  margin-bottom:10px;
`;

const PortfolioUL = styled.ul`
  line-height: 1.5;
`;


const TechnologiesUsedChart = ({technologies}) => {
  const theme = useContext(ThemeContext);
  const data = {
    labels: technologies.map(({type}) => type),
    datasets: [{
      data: technologies.map(({value}) => value),
      backgroundColor: technologies.map(({type}) => techColors[type]),
      hoverBackgroundColor: technologies.map(({type}) => techColors[type])
    }]
  };
  const options = {
    defaultFontColor: theme.palette.text.primary,
    legend: {
      labels: {
        fontColor: theme.palette.text.primary
      }
    }
  };

  return <Pie data={data} options={options} />
};

const ActionsHolder = styled.div`
  margin-left: auto;

  ${({theme}) => theme.breakpoints.down('sm')} {
    margin-left: 0px;
  }
`;

const Level2Holder = styled.div`
  display: flex;

  .whatIDid {
    flex-grow: 2;
    width: 66%;
    margin-right: ${props => props.theme.spacing(2)}px;
  }

  .techUsed {
    flex-grow: 1;
    width: calc(34% - ${props => props.theme.spacing(2)}px);
  }

  ${({theme}) => theme.breakpoints.down('sm')} {
    flex-direction: column;

    .whatIDid, .techUsed {
      width: 100%;
    }
  }

`;


const PortfolioPage = ({data}) => (
  <Layout>
    <BodyContainer flexCenter>
      <Inner>
        <PortfolioHeader>
          {data.title && <Title>{data.title}</Title>}
          <ActionsHolder>
            {data.githubUrl && <Button href={data.githubUrl} target="_blank">View Github Code</Button>}
            {data.url && <Button href={data.url} target="_blank">Open Demo in new Tab</Button>}
            {data.urls && data.urls.map(url => <Button href={url} target="_blank">Visit {url}</Button>)}
          </ActionsHolder>
        </PortfolioHeader>
          {data.iframe && <Iframe {...data.iframe} />}
          {data.images && <Slider speed={5000}>
            {data.images.map(img => {
              return <div><a href={img.src.publicURL} target="__blank"><img alt={data.title} src={img.thumbnail.publicURL} /></a></div>;
            })}
          </Slider>}
        <PortfolioDetails>
        <Level2Holder>
        {data.whatIDid && <PortfolioDetailsCard className="whatIDid">
          <PortfolioDetailsTitle>What I Did</PortfolioDetailsTitle>
          <PortfolioUL>
            {data.whatIDid.map(item => <li>{item}</li>)}
          </PortfolioUL>
        </PortfolioDetailsCard>}
          {data.technologiesUsed && <PortfolioDetailsCard className="techUsed">
            <PortfolioDetailsTitle>Technologies Used</PortfolioDetailsTitle>
            <TechnologiesUsedChart technologies={data.technologiesUsed} />
          </PortfolioDetailsCard>}
        </Level2Holder>
          {data.about && <PortfolioDetailsCard>
            <div dangerouslySetInnerHTML={{ __html: data.about }} />
          </PortfolioDetailsCard>}
        </PortfolioDetails>
      </Inner>
    </BodyContainer>
  </Layout>
);

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
        html
        frontmatter {
          path
          title
          slug
          url
          urls
          thumbnail {
            publicURL
          }
          whatIDid
          iframe {
            scrolling
            height
            src
          }
          whatIDid
          technologiesUsed {
            type
            value
          }
          images {
            thumbnail {
              publicURL
            }
            src {
              publicURL
            }
          }
        }
    }
  }
`


export default ({data}) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return <PortfolioPage data={{...frontmatter, about: html}} />
};
