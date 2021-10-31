import React from "react";
import Education from "./Education";
import Hero from "./Hero";
import PortfolioShowcase from "./PortfolioShowcase";
import TechnicalSkills from "./TechnicalSkills";
import ThreeSellPoints from "./ThreeSellPoints";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ThreeSellPoints />
      <TechnicalSkills />
      <Education />
      <PortfolioShowcase />
    </div>
  );
};

export default HomePage;
