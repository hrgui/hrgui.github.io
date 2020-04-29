import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import Container from '../Container'
import styled from 'styled-components'
import useInterval from '../../hooks/useInterval'

const MarketBulletsContainer = styled.div`
  background: #222;
  color: #fafafa;
  padding-top: ${({ theme }) => theme.spacing(6)}px;
  padding-bottom: ${({ theme }) => theme.spacing(12)}px;
`

export const Cards = props => {
  return (
    <Grid container spacing={3} {...props} />
  )
}

export const Card = props => {
  return (
    <Grid item sm={4}>
      {props.children}
    </Grid>
  )
}

export const CardHeader = styled.h3`
  font-weight: 300;
  font-size: 2em;

  ${({theme}) => theme.breakpoints.down('sm')} {
    font-size: 1.5rem;
  }
`

export const CardParagraph = styled.p`
  font-size: 16px;
  line-height: 1.625rem;
  color: #dedede;
`

export const TechnologiesLikeTheseCtr = styled.div`
  border-bottom: 3px solid ${({theme}) => theme.palette.primary.main};
  display: inline;
  min-width: 280px;
  transition: 250ms all;
  text-align: center;

  ${({theme}) => theme.breakpoints.down('md')} {
    min-width: 100px;
  }
`

const techChoicesIveWorkedWith = [
  'Java',
  'JavaScript',
  'Node.js',
  'Terraform',
  'Google Cloud',
  'Firebase',
  'Datastore',
  'Firestore',
  'Cloud Functions',
  'App Engine',
  'Angular.js',
  'React.js',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'BigQuery',
  'GraphQL',
  'Redux',
  'Android',
  'C#',
  'VBScript',
  'PHP',
  'Python',
  'Ruby',
  'C++',
]

const TechnologiesLikeThese = () => {
  const [currentOtherTech, setCurrentOtherTech] = useState(
    'technologies like these'
  )

  useInterval(() => {
    setCurrentOtherTech(
      techChoicesIveWorkedWith[Math.floor(Math.random() * techChoicesIveWorkedWith.length)]
    )
  }, 2500)

  return <TechnologiesLikeTheseCtr>{currentOtherTech}</TechnologiesLikeTheseCtr>
}

const MarketBullets = function() {
  return (
    <MarketBulletsContainer>
      <Container>
        <Cards>
          <Card>
            <CardHeader>Making the web awesome is my passion.</CardHeader>
            <CardParagraph>
              I am a Frontend / JavaScript engineer who loves to make
              interactive web applications. I believe web applications should
              function great, and look pleasing to the eye for the best user
              experience. When people get stuff done in the apps I've worked on, it really gives me that sense of nirvana, but it doesn't just stop there. I always try to
              improve apps and their experiences to be the best as possible as they can be.
            </CardParagraph>
          </Card>
          <Card>
            <CardHeader>
              I've worked with <TechnologiesLikeThese />.
            </CardHeader>
            <CardParagraph>
              In my career, I've also had to work on things unknown and challenging to me, even if it's not frontend oriented.  I've contributed to web backend systems, automation
              platforms, and mobile applications of all kinds and sorts. Some of them were pleasant, some of them weren't. For the ones that weren't, I always try to help contribute making other developer experiences great, so they don't have to suffer as I did. So, I've had to dabble with build systems like Grunt, Gulp, Webpack, and I have vast knowledge of utilizing those to at least to perform CI/CD and to making developing iteratively on a platform awesome.
            </CardParagraph>
          </Card>
          <Card>
            <CardHeader>While my code is <code>compiling...</code></CardHeader>
            <CardParagraph>
              I love to play my guitar, thinking of that new, awesome guitar lick. I love to watch Japanese animation (anime) and
              further stimulate my creativity. Sometimes, I like to combine the
              two. I'd end up with learning how to play that favorite theme song in
              that anime. A dream of mine is if I could combine some of my
              hobbies and my coding, I will give my 110% to make that experience
              totally awesome.
            </CardParagraph>
          </Card>
        </Cards>
      </Container>
    </MarketBulletsContainer>
  )
}

export default MarketBullets
