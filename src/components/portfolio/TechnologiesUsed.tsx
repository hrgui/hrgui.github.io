import { PortfolioTechnology } from "types/frontmatter";

interface Props {
  data?: PortfolioTechnology[];
  className?: string;
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

const TechnologiesUsed = ({ className, ...props }: Props) => {
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
    <div className={className}>
      <h3 className="font-semibold text-2xl md:text-4xl text-gray-700 dark:text-gray-200 mb-6">
        Technologies Used
      </h3>
      TODO
    </div>
  );
};

export default TechnologiesUsed;
