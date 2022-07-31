import React from "react";
import PortfolioShowcase from "@/components/app/portfolio/PortfolioShowcase";
import Education from "./sections/Education";
import Hero from "./sections/Hero";
import TechnicalSkills from "./sections/TechnicalSkills";
import ThreeSellPoints from "./sections/ThreeSellPoints";

const HomePage = ({ portfolioItems }) => {
  return (
    <div>
      <Hero />
      <ThreeSellPoints />
      <TechnicalSkills />
      <Education />
      <PortfolioShowcase items={portfolioItems} />
    </div>
  );
};

export default HomePage;
