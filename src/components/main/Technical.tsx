import React from 'react'
import styled from 'styled-components'
import { Cards, Card, CardHeader as CardTitle } from './MarketBullets'
import Container from '../Container'

const TechnicalCards = styled(Cards)`
  border-bottom: 3px solid ${({theme}) => theme.palette.text.secondary};
  margin-bottom: 20px;
`;

const TechnicalContainer = styled.div`
  padding: 20px;
  padding-top: 60px;
  padding-bottom: 90px;
  width: 100%;
  background: #d7f1fe;
 
`

const Inner = styled.div`
  width: 100%;
`

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

const Subtitle = styled.h2`
  letter-spacing: .0625rem;
  text-transform: uppercase;
  color: ${({theme}) => theme.palette.text.secondary};
  font-size: 1rem;
`;

const TechnicalList = styled.ul`
  padding: 0;

  li > & {
    padding-left: 20px;
    border-left: 3px solid ${({theme}) => theme.palette.text.secondary};
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

const TechnicalItem = styled.li`
  list-style: none;
  line-height: 1.625;
  color: ${({theme}) => theme.palette.text.primary};
`

const EducationCard = styled.div`
  display: flex;
  align-items: center;
`

const EducationTitle = styled.h2`
  text-transform: uppercase;
  font-weight: 500;
  margin: 0;
  line-height: 1.5;
`
const EducationSubTitle = styled.p`
  margin: 0;
  line-height: 1.5;
`
const EducationDetails = styled.p`
  margin: 0;
  color: ${({theme}) => theme.palette.text.secondary};
  line-height: 1.5;
`
const EducationImage = styled.img`
  border: 2px solid #222;
  padding: 1px;
`
const EducationLeft = styled.div`
  margin-right: ${props => props.theme.spacing(2)}px;
`
const EducationRight = styled.div``

const HighlightedTitle = styled.span`
  background: #ffcc00;
  padding: ${props => props.theme.spacing(1)}px;
  font-weight: 500;

  &.html {
    background: #e44d26;
    color: #fff;
  }

  &.css {
    background: #3C99DC;
    color: #fff;
  }
`;

const uscImage = require('../../images/usc.png')

export default function() {
  return (
    <TechnicalContainer>
      <Container>
        <Inner>
          <Subtitle>Experience... I have.</Subtitle>
          <Title>Technical Skills</Title>
          <TechnicalCards>
            <Card>
              <CardTitle>
                <HighlightedTitle>JavaScript</HighlightedTitle>
              </CardTitle>
              <TechnicalList>
                <TechnicalItem>Node.js</TechnicalItem>
                <TechnicalItem>React.js</TechnicalItem>
                <TechnicalItem>Webpack</TechnicalItem>
                <TechnicalItem>...VanillaJS</TechnicalItem>
              </TechnicalList>
            </Card>
            <Card>
              <CardTitle>
                <HighlightedTitle className="html">HTML</HighlightedTitle> / <HighlightedTitle className="css">CSS</HighlightedTitle>
              </CardTitle>
              <TechnicalList>
                <TechnicalItem>HTML5</TechnicalItem>
                <TechnicalItem>
                  CSS3 / CSS Preprocessors
                  <TechnicalList>
                    <TechnicalItem>SASS</TechnicalItem>
                    <TechnicalItem>CSS Modules</TechnicalItem>
                    <TechnicalItem>Styled Components</TechnicalItem>
                    <TechnicalItem>JSS</TechnicalItem>
                  </TechnicalList>
                </TechnicalItem>
              </TechnicalList>
            </Card>
            <Card>
              <CardTitle>Other</CardTitle>
              <TechnicalList>
                <TechnicalItem>
                  GraphQL
                </TechnicalItem>
                <TechnicalItem>
                  NoSQL
                  <TechnicalList>
                    <TechnicalItem>MongoDB</TechnicalItem>
                    <TechnicalItem>Google Cloud Datastore</TechnicalItem>
                    <TechnicalItem>Firebase</TechnicalItem>
                  </TechnicalList>
                </TechnicalItem>
                <TechnicalItem>
                  SQL
                  <TechnicalList>
                    <TechnicalItem>MySQL</TechnicalItem>
                    <TechnicalItem>PostgreSQL</TechnicalItem>
                    <TechnicalItem>Google Cloud BigQuery</TechnicalItem>
                  </TechnicalList>
                </TechnicalItem>
                <TechnicalItem>
                  Other Programming Languages
                  <TechnicalList>
                    <TechnicalItem>Python</TechnicalItem>
                  </TechnicalList>
                </TechnicalItem>
              </TechnicalList>
            </Card>
          </TechnicalCards>
          <Title>Education</Title>
          <EducationCard>
            <EducationLeft>
              <EducationImage width={50} src={uscImage} />
            </EducationLeft>
            <EducationRight>
              <EducationTitle>University of Southern California</EducationTitle>
              <EducationSubTitle>
                Bachelor of Science (B.S.), Computer Science and Engineering,
                Magna Cum Laude
              </EducationSubTitle>
              <EducationDetails>2010 &mdash; 2013</EducationDetails>
            </EducationRight>
          </EducationCard>
        </Inner>
      </Container>
    </TechnicalContainer>
  )
}
