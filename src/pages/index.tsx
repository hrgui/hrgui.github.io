import React from 'react'

import Layout from '../components/Layout'
import { Hero } from '../components/main/Hero';
import MarketBullets from '../components/main/MarketBullets';
import Technical from '../components/main/Technical';
import Portfolio from '../components/main/Portfolio';

const IndexPage = (props) => (
  <Layout isBreakout>
    <Hero />
    <MarketBullets />
    <Technical />
    <Portfolio {...props} />
  </Layout>
)

export default IndexPage
