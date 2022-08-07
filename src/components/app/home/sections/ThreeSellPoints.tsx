import { threeSellPoints as defaultThreeSellPoints } from "@/constants";
import React from "react";

interface Props extends React.HTMLProps<HTMLDivElement> {}

function Item({ title, children, ...props }: Props) {
  return (
    <div className="prose prose-md dark:prose-invert mb-6" {...props}>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

const ThreeSellPoints = ({
  threeSellPoints = defaultThreeSellPoints,
}: {
  threeSellPoints?: typeof defaultThreeSellPoints;
}) => {
  return (
    <div
      className="p-6 pt-16 pb-16 bg-dolly-200 dark:bg-neutral-800"
      data-testid="section-three-sell-points"
    >
      <div className="container mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
        {threeSellPoints.map(({ title, description }) => {
          return (
            <Item key={title} title={title}>
              {description}
            </Item>
          );
        })}
      </div>
    </div>
  );
};

export default ThreeSellPoints;
