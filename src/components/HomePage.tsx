import React from "react"
import Education from "./Education"
import Hero from "./Hero"
import PortfolioShowcase from "./PortfolioShowcase"
import TechnicalSkills from "./TechnicalSkills"
import ThreeSellPoints from "./ThreeSellPoints"

const HomePage = ({ portfolioItems }) => {
  return (
    <div>
      <Hero />
      <ThreeSellPoints />
      <TechnicalSkills />
      <Education />
      <PortfolioShowcase items={portfolioItems} />
    </div>
  )
}

export default HomePage
