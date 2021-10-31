import React from "react";
import { PortfolioTechnology } from "utils/mdxUtils";
import { Pie } from "react-chartjs-2";

interface Props {
  data?: PortfolioTechnology[];
}

export const techColors = {
  JAVASCRIPT: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  MYSQL: "#00758F",
  POSTGRESQL: "#1e6692",
  FIREBASE: "#FFA000",
  WORDPRESS: "#21759b",
};

const TechnologiesUsed = (props: Props) => {
  const technologies = props.data;
  const data = {
    labels: technologies.map(({ type }) => type),
    datasets: [
      {
        data: technologies.map(({ value }) => value),
        backgroundColor: technologies.map(({ type }) => techColors[type]),
        hoverBackgroundColor: technologies.map(({ type }) => techColors[type]),
      },
    ],
  };

  return (
    <div>
      <h3 className="font-semibold text-2xl mb-6">Technologies Used</h3>
      <Pie data={data} />
    </div>
  );
};

export default TechnologiesUsed;
