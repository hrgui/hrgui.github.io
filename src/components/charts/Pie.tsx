import { Chart, PieController, ArcElement, Tooltip } from "chart.js";
import { useEffect, useRef } from "preact/hooks";

Chart.register(PieController, ArcElement, Tooltip);

type Dataset = {
  data: number[];
  backgroundColor?: string[];
  hoverBackgroundColor?: string[];
};

type Props = {
  data: { labels: string[]; datasets: Dataset[] };
};

const Pie = ({ data }: Props) => {
  const ref = useRef<HTMLCanvasElement>();

  useEffect(() => {
    if (ref.current && data) {
      new Chart(ref.current.getContext("2d"), {
        type: "pie",
        data,
      });
    }
  }, [ref, data]);

  return (
    <div>
      <canvas ref={ref} height={150} width={300}></canvas>
    </div>
  );
};

export default Pie;
